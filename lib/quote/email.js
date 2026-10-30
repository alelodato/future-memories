const RESEND_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "Future Memories <onboarding@resend.dev>";

const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(iso) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Rome",
  });
}

function dayRows(summary) {
  const rows = [["Servizio", summary.service]];
  if (summary.day.date) rows.push(["Data", formatDate(summary.day.date)]);
  rows.push(["Copertura", `dalle ${summary.day.start} alle ${summary.day.end}`]);
  if (summary.day.guests) rows.push(["Invitati", summary.day.guests]);
  if (summary.day.ceremony) rows.push(["Rito", summary.day.ceremony]);
  rows.push(["Fasi", summary.phases.join(", ")]);
  summary.locations.forEach((item) =>
    rows.push([item.label === "Location" ? "Location" : `Location ${item.label.toLowerCase()}`, item.value])
  );
  return rows;
}

function htmlTable(rows) {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #d9c8b2;color:#5a4637;font-size:12px;text-transform:uppercase;letter-spacing:2px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid #d9c8b2;color:#2a1e16;font-size:14px;text-align:right;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");
}

export function buildQuoteEmail(coupleNames, summary) {
  const subject = summary.custom
    ? `Richiesta di preventivo su misura: ${coupleNames}`
    : `Nuovo preventivo: ${coupleNames} · ${euro.format(summary.total)}`;

  const days = dayRows(summary);
  const lines = summary.custom ? [] : summary.lines.map((line) => [line.label, euro.format(line.amount)]);
  const installments = summary.custom
    ? []
    : summary.installments.map((step) => [
        step.label,
        `${euro.format(step.amount)} · ${step.dueDate ? `entro il ${formatDate(step.dueDate)}` : step.due}`,
      ]);

  const adminUrl = process.env.QUOTE_ADMIN_URL;

  const html = `
  <div style="background:#efe6da;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#f7f2ea;padding:32px;">
      <p style="margin:0;color:#5a4637;font-size:11px;text-transform:uppercase;letter-spacing:3px;">Future Memories · Preventivo</p>
      <h1 style="margin:12px 0 4px;color:#2a1e16;font-family:Georgia,serif;font-size:30px;font-weight:normal;">${escapeHtml(coupleNames)}</h1>
      <p style="margin:0 0 24px;color:#5a4637;font-size:14px;">
        ${summary.custom ? "Richiesta di preventivo su misura: rito e ricevimento non sono entrambi presenti." : "Hanno composto il preventivo e vogliono bloccare la data."}
      </p>

      <h2 style="margin:24px 0 4px;color:#2a1e16;font-family:Georgia,serif;font-size:20px;font-weight:normal;">La giornata</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${htmlTable(days)}</table>

      ${
        summary.custom
          ? ""
          : `
      <h2 style="margin:28px 0 4px;color:#2a1e16;font-family:Georgia,serif;font-size:20px;font-weight:normal;">Preventivo</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${htmlTable(lines)}</table>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;background:#2a1e16;">
        <tr>
          <td style="padding:14px 16px;color:#f7f2ea;font-size:12px;text-transform:uppercase;letter-spacing:3px;">Totale</td>
          <td style="padding:14px 16px;color:#f7f2ea;font-family:Georgia,serif;font-size:24px;text-align:right;">${euro.format(summary.total)}</td>
        </tr>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px;">${htmlTable(installments)}</table>`
      }

      ${
        adminUrl
          ? `<p style="margin:32px 0 0;text-align:center;">
               <a href="${escapeHtml(adminUrl)}" style="display:inline-block;background:#2a1e16;color:#f7f2ea;text-decoration:none;padding:14px 24px;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Apri nel gestionale</a>
             </p>`
          : ""
      }
    </div>
  </div>`;

  const text = [
    coupleNames,
    summary.custom ? "Richiesta di preventivo su misura." : "Nuovo preventivo da confermare.",
    "",
    ...days.map(([label, value]) => `${label}: ${value}`),
    ...(summary.custom
      ? []
      : [
          "",
          ...lines.map(([label, value]) => `${label}: ${value}`),
          `TOTALE: ${euro.format(summary.total)}`,
          "",
          ...installments.map(([label, value]) => `${label}: ${value}`),
        ]),
    ...(adminUrl ? ["", `Gestionale: ${adminUrl}`] : []),
  ].join("\n");

  return { subject, html, text };
}

// Invia la notifica alla cliente. Non lancia mai errori: in caso di problemi li registra nei log.
export async function sendQuoteEmail(coupleNames, summary) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    console.warn("Email preventivo non inviata: RESEND_API_KEY o QUOTE_NOTIFY_EMAIL mancanti.");
    return false;
  }

  const { subject, html, text } = buildQuoteEmail(coupleNames, summary);

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM_EMAIL || DEFAULT_FROM,
        to: [to],
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error("Email preventivo:", response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Email preventivo:", error.message);
    return false;
  }
}
