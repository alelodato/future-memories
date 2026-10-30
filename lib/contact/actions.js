"use server";

import { sendContactEmail } from "@/lib/contact/email";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max = 300) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Riceve i dati del form di contatto, li ricontrolla sul server e li invia alla cliente.
export async function submitContact(form) {
  // Campo esca anti-spam: se è compilato è un bot, e rispondiamo come se fosse andato tutto bene.
  if (form?.botcheck) return { ok: true };

  const name = clean(form?.name, 120);
  const email = clean(form?.email, 200);
  const phone = clean(form?.phone, 40);
  const dateStatus = form?.dateStatus === "si" || form?.dateStatus === "no" ? form.dateStatus : "";
  const date = dateStatus === "si" && /^\d{4}-\d{2}-\d{2}$/.test(form?.date || "") ? form.date : "";
  const message = clean(form?.message, 3000);

  const valid =
    name &&
    EMAIL_PATTERN.test(email) &&
    phone.replace(/\D/g, "").length >= 6 &&
    dateStatus &&
    (dateStatus === "no" || date) &&
    form?.privacy === true;

  if (!valid) return { ok: false };

  const sent = await sendContactEmail({ name, email, phone, date, message });
  return { ok: sent };
}
