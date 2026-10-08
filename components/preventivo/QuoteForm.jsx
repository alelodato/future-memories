"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import { site } from "@/data/site";
import { sendConfirmation } from "@/lib/sendConfirmation";
import { submitToWeb3Forms } from "@/lib/web3forms";

const SERVICES = ["Foto", "Video", "Foto + Video"];
const EXTRAS = ["Drone", "Wedding trailer", "Trailer in diretta", "Discorsi integrali", "Reel per Instagram"];
const SOURCES = ["Instagram", "Google", "Passaparola", "Altro"];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  date: "",
  location: "",
  guests: "",
  service: "",
  extras: [],
  source: "",
  message: "",
  privacy: false,
};

// Ordine dei campi obbligatori: il focus va al primo campo non valido.
const REQUIRED_ORDER = ["name", "email", "phone", "date", "location", "service", "privacy"];

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Inserite nome e cognome.";
  if (!values.email.trim()) errors.email = "Inserite un indirizzo email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "L’indirizzo email non sembra corretto.";
  if (!values.phone.trim()) errors.phone = "Inserite un numero di telefono.";
  else if (values.phone.replace(/\D/g, "").length < 6)
    errors.phone = "Il numero di telefono non sembra corretto.";
  if (!values.date.trim()) errors.date = "Indicate la data o scrivete “non ancora decisa”.";
  if (!values.location.trim()) errors.location = "Indicate la location o la città.";
  if (!values.service) errors.service = "Scegliete un servizio.";
  if (!values.privacy) errors.privacy = "Il consenso è necessario per inviare la richiesta.";
  return errors;
}

const inputClass =
  "mt-2 w-full border bg-crema px-4 py-3 text-base text-marrone placeholder:text-marrone-medio/70 focus:outline-2 focus:outline-offset-0 focus:outline-marrone";

function fieldBorder(error) {
  return error ? "border-errore" : "border-beige-scuro";
}

function ErrorText({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-errore">
      {children}
    </p>
  );
}

function TextField({ name, label, required, error, type = "text", ...props }) {
  const errorId = `${name}-errore`;
  return (
    <div>
      <label htmlFor={name}>
        <Label as="span">
          {label}
          {required && " *"}
        </Label>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${inputClass} ${fieldBorder(error)}`}
        {...props}
      />
      <ErrorText id={errorId}>{error}</ErrorText>
    </div>
  );
}

export default function QuoteForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const formRef = useRef(null);

  // Con Cache Components la pagina resta montata in background: i dati
  // inseriti restano, ma il messaggio di esito non deve ricomparire.
  useLayoutEffect(() => () => setStatus("idle"), []);

  const update = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const onChange = (event) => update(event.target.name, event.target.value);

  const toggleExtra = (extra) => {
    setValues((current) => ({
      ...current,
      extras: current.extras.includes(extra)
        ? current.extras.filter((item) => item !== extra)
        : [...current.extras, extra],
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    const firstInvalid = REQUIRED_ORDER.find((name) => found[name]);
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      setStatus("idle");
      return;
    }

    // Campo esca anti-spam: se compilato, la richiesta viene ignorata.
    if (formRef.current?.elements.botcheck?.checked) return;

    setStatus("sending");
    const result = await submitToWeb3Forms({
      subject: `Richiesta di preventivo da ${values.name.trim()}`,
      from_name: `Sito ${site.name}`,
      name: values.name.trim(),
      email: values.email.trim(),
      Telefono: values.phone.trim(),
      "Data del matrimonio": values.date.trim(),
      "Location / Città": values.location.trim(),
      "Numero di invitati": values.guests.trim() || "-",
      Servizio: values.service,
      Extra: values.extras.length ? values.extras.join(", ") : "-",
      "Come ci avete conosciuto": values.source || "-",
      Messaggio: values.message.trim() || "-",
      "Consenso privacy": "Sì",
    });

    if (result.ok) {
      await sendConfirmation(values);
      setStatus("success");
      setValues(EMPTY);
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="bg-beige p-8 lg:p-12">
        <h2 className="font-serif text-3xl lg:text-4xl">Grazie, richiesta inviata!</h2>
        <p className="mt-4 leading-relaxed">
          Vi rispondiamo entro {site.responseTime}. Per qualsiasi cosa potete scriverci anche su WhatsApp.
        </p>
        <div className="mt-8">
          <Button variant="outline" onClick={() => setStatus("idle")}>
            Invia un’altra richiesta
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Richiesta di preventivo">
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-x-6">
        <TextField name="name" label="Nome e cognome" required autoComplete="name" value={values.name} onChange={onChange} error={errors.name} />
        <TextField name="email" label="Email" type="email" required autoComplete="email" value={values.email} onChange={onChange} error={errors.email} />
        <TextField name="phone" label="Telefono" type="tel" required autoComplete="tel" value={values.phone} onChange={onChange} error={errors.phone} />
        <TextField
          name="date"
          label="Data del matrimonio"
          required
          placeholder="gg/mm/aaaa o “non ancora decisa”"
          value={values.date}
          onChange={onChange}
          error={errors.date}
        />
        <TextField name="location" label="Location / Città" required value={values.location} onChange={onChange} error={errors.location} />
        <TextField
          name="guests"
          label="Numero di invitati"
          inputMode="numeric"
          placeholder="indicativo"
          value={values.guests}
          onChange={onChange}
        />

        <fieldset aria-describedby={errors.service ? "service-errore" : undefined}>
          <legend>
            <Label as="span">Servizio *</Label>
          </legend>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
            {SERVICES.map((service) => (
              <label key={service} className="inline-flex cursor-pointer items-center gap-2.5">
                <input
                  type="radio"
                  name="service"
                  value={service}
                  checked={values.service === service}
                  onChange={onChange}
                  className="h-5 w-5 accent-marrone"
                />
                {service}
              </label>
            ))}
          </div>
          <ErrorText id="service-errore">{errors.service}</ErrorText>
        </fieldset>

        <div>
          <label htmlFor="source">
            <Label as="span">Come ci avete conosciuto</Label>
          </label>
          <select
            id="source"
            name="source"
            value={values.source}
            onChange={onChange}
            className={`${inputClass} ${fieldBorder()} appearance-none`}
          >
            <option value="">Instagram · Google · Passaparola · Altro</option>
            {SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="lg:col-span-2">
          <legend>
            <Label as="span">Extra</Label>
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EXTRAS.map((extra) => (
              <label key={extra} className="inline-flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  name="extras"
                  value={extra}
                  checked={values.extras.includes(extra)}
                  onChange={() => toggleExtra(extra)}
                  className="h-5 w-5 accent-marrone"
                />
                {extra}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="lg:col-span-2">
          <label htmlFor="message">
            <Label as="span">Messaggio</Label>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={onChange}
            className={`${inputClass} ${fieldBorder()} resize-y`}
          />
        </div>

        <div className="lg:col-span-2">
          <label className="inline-flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              name="privacy"
              checked={values.privacy}
              onChange={(event) => update("privacy", event.target.checked)}
              aria-required="true"
              aria-invalid={errors.privacy ? true : undefined}
              aria-describedby={errors.privacy ? "privacy-errore" : undefined}
              className="mt-0.5 h-5 w-5 shrink-0 accent-marrone"
            />
            <span>
              Acconsento al trattamento dei dati personali (
              <Link href="/privacy-policy" className="underline" target="_blank">
                privacy policy
              </Link>
              ) *
            </span>
          </label>
          <ErrorText id="privacy-errore">{errors.privacy}</ErrorText>
        </div>

        {/* Campo esca anti-spam di Web3Forms, nascosto agli utenti */}
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-6 border border-errore bg-crema p-4 text-sm text-errore">
          Non è stato possibile inviare la richiesta. Riprovate tra poco oppure scriveteci su{" "}
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="underline">
            WhatsApp
          </a>
          .
        </p>
      )}

      <div className="mt-8">
        <Button type="submit" fullWidth disabled={status === "sending"}>
          {status === "sending" ? "Invio in corso…" : "Invia la richiesta"}
        </Button>
      </div>
    </form>
  );
}
