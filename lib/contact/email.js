const RESEND_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "Future Memories <onboarding@resend.dev>";

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

function htmlTable(rows) {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #d9c8b2;color:#5a4637;font-size:12px;text-transform:uppercase;letter-spacing:2px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid #d9c8b2;color:#2a1e16;font-size:14px;white-space:pre-line;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");
}

export function buildContactEmail(data) {
  const rows = [
    ["Nome e cognome", data.name],
    ["Email", data.email],
    ["Telefono", data.phone],
    ["Data dell’evento", data.date ? formatDate(data.date) : "Non ancora decisa"],
    ["Messaggio", data.message || "-"],
  ];

  const subject = `Nuova richiesta dal sito: ${data.name}`;

  const html = `
  <div style="background:#efe6da;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#f7f2ea;padding:32px;">
      <p style="margin:0;color:#5a4637;font-size:11px;text-transform:uppercase;letter-spacing:3px;">Future Memories · Richiesta dal sito</p>
      <h1 style="margin:12px 0 4px;color:#2a1e16;font-family:Georgia,serif;font-size:30px;font-weight:normal;">${escapeHtml(data.name)}</h1>
      <p style="margin:0 0 24px;color:#5a4637;font-size:14px;">Per rispondere basta premere "Rispondi": l’email arriva direttamente a ${escapeHtml(data.email)}.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${htmlTable(rows)}</table>
    </div>
  </div>`;

  const text = [
    `Nuova richiesta dal sito: ${data.name}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  return { subject, html, text };
}

// Invia la richiesta alla cliente, con "Rispondi a" impostato sull'email di chi ha scritto.
// Restituisce true se l'invio è riuscito.
export async function sendContactEmail(data) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    console.error("Email contatto non inviata: RESEND_API_KEY o QUOTE_NOTIFY_EMAIL mancanti.");
    return false;
  }

  const { subject, html, text } = buildContactEmail(data);

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM_EMAIL || DEFAULT_FROM,
        to: [to],
        reply_to: data.email,
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error("Email contatto:", response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Email contatto:", error.message);
    return false;
  }
}
