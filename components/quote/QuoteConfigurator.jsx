"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Label from "@/components/ui/Label";
import { site } from "@/data/site";
import { submitQuote } from "@/lib/quote/actions";
import { CEREMONY_TYPES, INCLUDES, MAX_COVERAGE_HOURS, PHASES, PRE_POST, SERVICES, TEXTS } from "@/lib/quote/listino";
import { availableExtras, computeQuote, coverageMinutes, formatEuro } from "@/lib/quote/pricing";

const inputClass =
    "mt-2 w-full border border-beige-scuro bg-crema px-4 py-3 text-base text-marrone placeholder:text-marrone-medio/70 [color-scheme:light] focus:outline-2 focus:outline-offset-0 focus:outline-marrone";

const ERROR_ORDER = ["service", "date", "coverage", "phases", "singleLocation", "locations"];

const INCLUDED_BY_SERVICE = { foto: ["foto"], video: ["video"], fotoVideo: ["foto", "video"] };

function toDate(iso) {
    return new Date(`${iso}T12:00:00`);
}

function shiftDate(iso, days) {
    const date = toDate(iso);
    date.setDate(date.getDate() + days);
    return date;
}

function formatLongDate(date) {
    return date.toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
}

function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    const hoursText = `${hours} ${hours === 1 ? "ora" : "ore"}`;
    return rest ? `${hoursText} e ${rest} minuti` : hoursText;
}

function Section({ id, title, description, children }) {
    return (
        <section id={id} aria-labelledby={`${id}-titolo`} className="scroll-mt-[calc(var(--navbar-height)+1.5rem)]">
            <h2 id={`${id}-titolo`} className="font-serif text-3xl lg:text-4xl">{title}</h2>
            {description && <p className="mt-2 text-sm text-marrone-medio">{description}</p>}
            <div className="mt-4 border-t border-beige-scuro pt-6">{children}</div>
        </section>
    );
}

function ChoiceCard({ type, name, checked, onChange, label, description, price, priceNote }) {
    return (
        <label
            className={`flex cursor-pointer items-start gap-3 border bg-crema p-4 transition hover:border-marrone-medio ${checked ? "border-marrone" : "border-beige-scuro"
                }`}
        >
            <input type={type} name={name} checked={checked} onChange={onChange} className="mt-0.5 h-5 w-5 shrink-0 accent-marrone" />
            <span className="flex-1">
                <span className="block font-sans text-sm font-semibold">{label}</span>
                {description && <span className="mt-1 block text-xs leading-relaxed text-marrone-medio">{description}</span>}
            </span>
            {price != null && (
                <span className="shrink-0 text-right font-sans text-sm font-semibold">
                    {priceNote && <span className="block text-xs font-normal text-marrone-medio line-through">{priceNote}</span>}
                    {formatEuro(price)}
                </span>
            )}
        </label>
    );
}

function ErrorText({ children }) {
    if (!children) return null;
    return <p className="mt-2 text-sm text-errore">{children}</p>;
}

export default function QuoteConfigurator({ token, coupleNames, expiresAt }) {
    const [service, setService] = useState("");
    const [date, setDate] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [guests, setGuests] = useState("");
    const [ceremony, setCeremony] = useState("");
    const [phases, setPhases] = useState(PHASES.map((phase) => phase.id));
    const [singleLocation, setSingleLocation] = useState(null);
    const [locations, setLocations] = useState({});
    const [extras, setExtras] = useState([]);
    const [prePost, setPrePost] = useState("");
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle"); // idle | sending | sent | sentCustom
    const [serverError, setServerError] = useState("");
    const [today, setToday] = useState(null);

    // La data di oggi si legge solo nel browser, per evitare differenze con il rendering sul server.
    useEffect(() => {
        const now = new Date();
        setToday(
            `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
        );
    }, []);

    // La barra del totale prende il posto del WhatsApp flottante (regola in globals.css).
    useEffect(() => {
        const root = document.documentElement;
        root.dataset.quoteBar = "visible";
        return () => {
            delete root.dataset.quoteBar;
        };
    }, []);

    const quote = useMemo(
        () => computeQuote({ service, phases, extras, prePost }),
        [service, phases, extras, prePost]
    );

    const extrasForService = service ? availableExtras(service) : [];
    const minutes = coverageMinutes(start, end);
    const coverageTooLong = minutes !== null && minutes > MAX_COVERAGE_HOURS * 60;

    function clearError(key) {
        if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
    }

    function chooseService(id) {
        setService(id);
        clearError("service");
        // Toglie gli extra non disponibili per il nuovo servizio, così non restano scelte nascoste.
        const allowed = availableExtras(id).map((extra) => extra.id);
        setExtras((current) => current.filter((extraId) => allowed.includes(extraId)));
    }

    function togglePhase(id) {
        setPhases((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
        clearError("phases");
    }

    function toggleExtra(extra) {
        setExtras((current) => {
            if (current.includes(extra.id)) return current.filter((id) => id !== extra.id);
            // Gli extra dello stesso gruppo sono alternativi: scegliendone uno si toglie l'altro.
            const others = extra.group
                ? current.filter((id) => extrasForService.find((item) => item.id === id)?.group !== extra.group)
                : current;
            return [...others, extra.id];
        });
    }

    function updateLocation(key, value) {
        setLocations((current) => ({ ...current, [key]: value }));
        clearError("locations");
    }

    function validate() {
        const found = {};
        if (!service) found.service = "Scegliete un servizio.";
        if (!date) found.date = "Indicate la data del matrimonio.";
        if (minutes === null) found.coverage = "Indicate l’orario di inizio e di fine.";
        else if (coverageTooLong)
            found.coverage = "La copertura supera le 10 ore: riducete l’orario o scriveteci per le ore aggiuntive.";
        if (!phases.length) found.phases = "Scegliete almeno una fase.";
        if (singleLocation === null) found.singleLocation = "Indicate se si svolge tutto in un’unica location.";
        else if (singleLocation ? !locations.single?.trim() : phases.some((id) => !locations[id]?.trim()))
            found.locations = "Indicate le location.";
        return found;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const found = validate();
        setErrors(found);
        const first = ERROR_ORDER.find((key) => found[key]);
        if (first) {
            document.getElementById(`campo-${first}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        setStatus("sending");
        setServerError("");
        try {
            const result = await submitQuote(token, {
                service,
                date,
                start,
                end,
                guests,
                ceremony,
                phases,
                singleLocation,
                locations,
                extras,
                prePost,
            });
            if (result.ok) {
                setStatus(result.custom ? "sentCustom" : "sent");
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                setStatus("idle");
                setServerError(result.error);
            }
        } catch {
            setStatus("idle");
            setServerError("Invio non riuscito. Controllate la connessione e riprovate.");
        }
    }

    // ── Conferma dopo l'invio ──
    if (status === "sent" || status === "sentCustom") {
        return (
            <section className="bg-sabbia py-20 lg:py-28">
                <Container>
                    <div className="mx-auto max-w-2xl text-center">
                        <Label>{coupleNames}</Label>
                        <h1 className="mt-4 font-serif text-5xl leading-tight lg:text-6xl">
                            {status === "sent" ? <>Grazie, <em>a presto</em>!</> : <>Richiesta <em>inviata</em></>}
                        </h1>
                        <p className="mt-6 leading-relaxed text-marrone-medio lg:text-lg">
                            {status === "sent"
                                ? "Abbiamo ricevuto il vostro preventivo: vi contatteremo a breve per confermare la data e l’acconto."
                                : "Vi contatteremo entro 24 ore con un preventivo su misura."}
                        </p>
                        <div className="mt-10">
                            <Button href={site.whatsappHref} variant="outline">Scrivici su WhatsApp</Button>
                        </div>
                    </div>
                </Container>
            </section>
        );
    }

    const includedKeys = INCLUDED_BY_SERVICE[service] || [];

    return (
        <div className="bg-sabbia pb-32 pt-12 lg:pb-40 lg:pt-16">
            <Container>
                <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                        <Label>Per {coupleNames}</Label>
                        <h1 className="mt-4 font-serif text-5xl leading-tight lg:text-6xl">
                            Il vostro <em>preventivo</em>
                        </h1>
                        <p className="mt-3 text-sm text-marrone-medio">
                            Link valido fino al {formatLongDate(new Date(expiresAt))}
                        </p>
                    </header>

                    <form onSubmit={handleSubmit} noValidate className="mt-14 space-y-16 lg:mt-20 lg:space-y-20">
                        {/* ── SERVIZIO ── */}
                        <Section id="servizio" title="Servizio" description="Scegliete il servizio che desiderate per il vostro matrimonio.">
                            <div id="campo-service" className="grid gap-3 sm:grid-cols-3">
                                {SERVICES.map((item) => (
                                    <ChoiceCard
                                        key={item.id}
                                        type="radio"
                                        name="service"
                                        checked={service === item.id}
                                        onChange={() => chooseService(item.id)}
                                        label={item.label}
                                    />
                                ))}
                            </div>
                            <ErrorText>{errors.service}</ErrorText>
                        </Section>

                        {/* ── COSA INCLUDE ── */}
                        {service && (
                            <Section
                                id="include"
                                title="Cosa include il servizio"
                                description="Ecco tutto quello che comprende il servizio che avete scelto."
                            >
                                <div className={`grid gap-4 ${includedKeys.length > 1 ? "lg:grid-cols-2" : ""}`}>
                                    {includedKeys.map((key) => {
                                        const block = INCLUDES[key];
                                        return (
                                            <div key={key} className="bg-beige p-6 lg:p-8">
                                                <h3 className="font-sans text-lg font-semibold">{block.title}</h3>
                                                <p className="mt-1 text-xs text-marrone-medio">{block.subtitle}</p>
                                                <ul className="mt-5 space-y-3">
                                                    {block.items.map((item) => (
                                                        <li key={item} className="flex gap-3 text-sm leading-relaxed">
                                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-marrone" aria-hidden="true" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Section>
                        )}

                        {/* ── LA VOSTRA GIORNATA ── */}
                        <Section
                            id="giornata"
                            title="La vostra giornata"
                            description="Raccontateci il vostro giorno: data, orari, fasi da raccontare e location."
                        >
                            <div className="space-y-8">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div id="campo-date">
                                        <label htmlFor="q-date">
                                            <Label as="span">Data del matrimonio *</Label>
                                        </label>
                                        <input
                                            id="q-date"
                                            type="date"
                                            value={date}
                                            min={today || undefined}
                                            onChange={(e) => {
                                                setDate(e.target.value);
                                                clearError("date");
                                            }}
                                            className={inputClass}
                                        />
                                        <ErrorText>{errors.date}</ErrorText>
                                    </div>
                                    <div>
                                        <label htmlFor="q-guests">
                                            <Label as="span">Numero invitati</Label>
                                        </label>
                                        <input
                                            id="q-guests"
                                            type="number"
                                            inputMode="numeric"
                                            min="1"
                                            value={guests}
                                            onChange={(e) => setGuests(e.target.value)}
                                            placeholder="indicativo"
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div id="campo-coverage">
                                    <Label as="span">Orario di copertura *</Label>
                                    <div className="mt-2 grid grid-cols-2 gap-4">
                                        <label className="block">
                                            <span className="text-sm text-marrone-medio">dalle</span>
                                            <input
                                                type="time"
                                                value={start}
                                                onChange={(e) => {
                                                    setStart(e.target.value);
                                                    clearError("coverage");
                                                }}
                                                className={inputClass}
                                            />
                                        </label>
                                        <label className="block">
                                            <span className="text-sm text-marrone-medio">alle</span>
                                            <input
                                                type="time"
                                                value={end}
                                                onChange={(e) => {
                                                    setEnd(e.target.value);
                                                    clearError("coverage");
                                                }}
                                                className={inputClass}
                                            />
                                        </label>
                                    </div>
                                    {minutes !== null && (
                                        <p className={`mt-3 text-sm ${coverageTooLong ? "text-errore" : "text-marrone"}`}>
                                            Copertura: {formatDuration(minutes)}
                                        </p>
                                    )}
                                    <p className="mt-2 text-xs leading-relaxed text-marrone-medio">{TEXTS.coverageNote}</p>
                                    <ErrorText>{errors.coverage}</ErrorText>
                                </div>

                                <div>
                                    <Label as="span">Rito</Label>
                                    <div className="mt-3 grid grid-cols-2 gap-3">
                                        {CEREMONY_TYPES.map((type) => (
                                            <ChoiceCard
                                                key={type}
                                                type="radio"
                                                name="ceremony"
                                                checked={ceremony === type}
                                                onChange={() => setCeremony(type)}
                                                label={type}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div id="campo-phases">
                                    <Label as="span">Fasi del matrimonio *</Label>
                                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                        {PHASES.map((phase) => (
                                            <ChoiceCard
                                                key={phase.id}
                                                type="checkbox"
                                                name="phases"
                                                checked={phases.includes(phase.id)}
                                                onChange={() => togglePhase(phase.id)}
                                                label={phase.label}
                                            />
                                        ))}
                                    </div>
                                    <ErrorText>{errors.phases}</ErrorText>
                                </div>

                                <div id="campo-singleLocation">
                                    <Label as="span">Location *</Label>
                                    <p className="mt-3 text-sm">Si svolge tutto in un’unica location?</p>
                                    <div className="mt-3 grid grid-cols-2 gap-3">
                                        <ChoiceCard
                                            type="radio"
                                            name="singleLocation"
                                            checked={singleLocation === true}
                                            onChange={() => {
                                                setSingleLocation(true);
                                                clearError("singleLocation");
                                            }}
                                            label="Sì"
                                        />
                                        <ChoiceCard
                                            type="radio"
                                            name="singleLocation"
                                            checked={singleLocation === false}
                                            onChange={() => {
                                                setSingleLocation(false);
                                                clearError("singleLocation");
                                            }}
                                            label="No"
                                        />
                                    </div>
                                    <ErrorText>{errors.singleLocation}</ErrorText>

                                    <div id="campo-locations" className="mt-6 space-y-5">
                                        {singleLocation === true && (
                                            <div>
                                                <label htmlFor="q-location-single">
                                                    <Label as="span">Location (nome della struttura e indirizzo)</Label>
                                                </label>
                                                <input
                                                    id="q-location-single"
                                                    type="text"
                                                    value={locations.single || ""}
                                                    onChange={(e) => updateLocation("single", e.target.value)}
                                                    className={inputClass}
                                                />
                                            </div>
                                        )}
                                        {singleLocation === false &&
                                            PHASES.filter((phase) => phases.includes(phase.id)).map((phase) => (
                                                <div key={phase.id}>
                                                    <label htmlFor={`q-location-${phase.id}`}>
                                                        <Label as="span">Location {phase.label.toLowerCase()} (nome e indirizzo)</Label>
                                                    </label>
                                                    <input
                                                        id={`q-location-${phase.id}`}
                                                        type="text"
                                                        value={locations[phase.id] || ""}
                                                        onChange={(e) => updateLocation(phase.id, e.target.value)}
                                                        className={inputClass}
                                                    />
                                                </div>
                                            ))}
                                        <ErrorText>{errors.locations}</ErrorText>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        {/* ── PACCHETTO BASE ── */}
                        <Section
                            id="pacchetto"
                            title="Pacchetto base"
                            description="Il punto di partenza del vostro preventivo, in base al servizio scelto."
                        >
                            {!quote.ready ? (
                                <p className="text-sm text-marrone-medio">Scegliete un servizio per vedere il prezzo.</p>
                            ) : quote.custom ? (
                                <p className="bg-beige p-5 text-sm leading-relaxed">{TEXTS.customQuote}</p>
                            ) : (
                                <div className="flex items-baseline justify-between gap-4 border border-marrone bg-crema p-4">
                                    <span className="font-sans text-sm font-semibold">{quote.service.baseLabel}</span>
                                    <span className="shrink-0 text-right">
                                        {quote.listPrice && (
                                            <span className="mr-2 text-sm text-marrone-medio line-through">{formatEuro(quote.listPrice)}</span>
                                        )}
                                        <span className="font-sans font-semibold">{formatEuro(quote.base)}</span>
                                    </span>
                                </div>
                            )}
                        </Section>

                        {/* ── EXTRA ── */}
                        <Section id="extra" title="Extra" description="Aggiungete i servizi che desiderate: il totale si aggiorna a ogni scelta.">
                            {service ? (
                                <div className="space-y-3">
                                    {extrasForService.map((extra) => (
                                        <ChoiceCard
                                            key={extra.id}
                                            type="checkbox"
                                            name="extras"
                                            checked={extras.includes(extra.id)}
                                            onChange={() => toggleExtra(extra)}
                                            label={extra.label}
                                            description={extra.description}
                                            price={extra.price}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-marrone-medio">Scegliete prima il servizio.</p>
                            )}
                        </Section>

                        {/* ── PRE / POST WEDDING ── */}
                        <Section
                            id="prepost"
                            title="Pre / post wedding"
                            description="Un servizio in un giorno diverso dal matrimonio, per raccontarvi ancora."
                        >
                            <div className="space-y-3">
                                <ChoiceCard
                                    type="radio"
                                    name="prePost"
                                    checked={prePost === ""}
                                    onChange={() => setPrePost("")}
                                    label="Nessuno"
                                />
                                {PRE_POST.map((item) => (
                                    <ChoiceCard
                                        key={item.id}
                                        type="radio"
                                        name="prePost"
                                        checked={prePost === item.id}
                                        onChange={() => setPrePost(item.id)}
                                        label={item.label}
                                        price={item.price}
                                    />
                                ))}
                            </div>
                        </Section>

                        {/* ── RIEPILOGO ── */}
                        <Section id="riepilogo" title="Riepilogo" description="Controllate il vostro preventivo e bloccate la data.">
                            {quote.ready && !quote.custom ? (
                                <div className="space-y-6">
                                    <div className="flex items-baseline justify-between gap-4 bg-marrone px-5 py-4 text-crema">
                                        <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em]">Totale</span>
                                        <span className="font-serif text-3xl">{formatEuro(quote.total)}</span>
                                    </div>
                                    <dl className="divide-y divide-beige-scuro">
                                        {quote.installments.map((step) => {
                                            let dueText = step.due;
                                            if (step.id === "acconto1" && today) dueText = `entro il ${formatLongDate(shiftDate(today, 10))}`;
                                            if (step.id === "acconto2" && date) dueText = `entro il ${formatLongDate(shiftDate(date, -5))}`;
                                            return (
                                                <div key={step.id} className="flex items-baseline justify-between gap-4 py-3">
                                                    <dt>
                                                        <span className="block font-sans text-sm font-semibold">{step.label}</span>
                                                        <span className="block text-xs text-marrone-medio">{dueText}</span>
                                                    </dt>
                                                    <dd className="shrink-0 font-sans text-sm font-semibold">{formatEuro(step.amount)}</dd>
                                                </div>
                                            );
                                        })}
                                    </dl>
                                    <p className="text-xs leading-relaxed text-marrone-medio">{TEXTS.validity}</p>
                                </div>
                            ) : quote.ready && quote.custom ? (
                                <p className="bg-beige p-5 text-sm leading-relaxed">{TEXTS.customQuote}</p>
                            ) : (
                                <p className="text-sm text-marrone-medio">Scegliete un servizio per vedere il riepilogo.</p>
                            )}

                            {serverError && (
                                <p role="alert" className="mt-6 border border-errore bg-crema p-4 text-sm text-errore">
                                    {serverError}
                                </p>
                            )}

                            <div className="mt-8">
                                <Button type="submit" fullWidth disabled={status === "sending"}>
                                    {status === "sending" ? "Invio in corso…" : quote.custom ? "Richiedi preventivo" : "Blocca la data"}
                                </Button>
                            </div>
                        </Section>
                    </form>
                </div>
            </Container>

            {/* ── BARRA DEL TOTALE ── */}
            <div
                className="fixed inset-x-0 bottom-0 z-40 bg-marrone text-crema"
                style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
                <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
                    <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em]">Totale</span>
                    <span className="font-serif text-2xl lg:text-3xl">
                        {!quote.ready ? "—" : quote.custom ? "Su misura" : formatEuro(quote.total)}
                    </span>
                </div>
            </div>
        </div>
    );
}