"use server";

import { getSupabase } from "@/lib/supabase";
import { CEREMONY_TYPES, PHASES, SERVICES } from "@/lib/quote/listino";
import { computeQuote, isCoverageValid } from "@/lib/quote/pricing";
import { getQuoteByToken, TOKEN_PATTERN } from "@/lib/quote/quotes";
import { sendQuoteEmail } from "@/lib/quote/email";

function clean(value, max = 300) {
    return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Data di oggi in Italia, nel formato aaaa-mm-gg.
function todayIso() {
    return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Rome" });
}

function shiftDate(iso, days) {
    const date = new Date(`${iso}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
}

export async function submitQuote(token, form) {
    if (!TOKEN_PATTERN.test(token || "")) return { ok: false, error: "Link non valido." };

    const service = SERVICES.find((item) => item.id === form?.service);
    const phases = PHASES.filter((phase) => (form?.phases || []).includes(phase.id));
    const date = /^\d{4}-\d{2}-\d{2}$/.test(form?.date || "") ? form.date : "";
    const start = /^\d{2}:\d{2}$/.test(form?.start || "") ? form.start : "";
    const end = /^\d{2}:\d{2}$/.test(form?.end || "") ? form.end : "";
    const singleLocation = form?.singleLocation === true;
    const locations = singleLocation
        ? [{ label: "Location", value: clean(form?.locations?.single) }]
        : phases.map((phase) => ({ label: phase.label, value: clean(form?.locations?.[phase.id]) }));

    if (!service || !date || !phases.length || !isCoverageValid(start, end) || locations.some((item) => !item.value)) {
        return { ok: false, error: "Alcuni dati non sono completi: controllate il modulo e riprovate." };
    }

    // Il totale si ricalcola qui, senza fidarsi di quello mostrato nel browser.
    const quote = computeQuote({
        service: service.id,
        phases: phases.map((phase) => phase.id),
        extras: Array.isArray(form?.extras) ? form.extras : [],
        prePost: form?.prePost || null,
    });

    const guests = Number.parseInt(form?.guests, 10);
    const dueDates = { acconto1: shiftDate(todayIso(), 10), acconto2: shiftDate(date, -5), saldo: null };

    // Riepilogo con le etichette in chiaro: il gestionale lo mostra così com'è, anche se in futuro il listino cambia.
    const summary = {
        service: service.label,
        custom: quote.custom,
        day: {
            date,
            start,
            end,
            guests: Number.isFinite(guests) && guests > 0 ? String(guests) : null,
            ceremony: CEREMONY_TYPES.includes(form?.ceremony) ? form.ceremony : null,
        },
        phases: phases.map((phase) => phase.label),
        locations,
        lines: quote.custom
            ? []
            : [
                { label: service.baseLabel, amount: quote.base, listAmount: quote.listPrice },
                ...quote.extras.map((extra) => ({ label: extra.label, amount: extra.price })),
                ...(quote.prePost ? [{ label: `Pre / post wedding · ${quote.prePost.label}`, amount: quote.prePost.price }] : []),
            ],
        total: quote.custom ? null : quote.total,
        installments: quote.custom
            ? []
            : quote.installments.map((step) => ({
                label: step.label,
                due: step.due,
                amount: step.amount,
                dueDate: dueDates[step.id],
            })),
    };

    const supabase = getSupabase();
    if (!supabase) return { ok: false, error: "Invio non disponibile al momento. Riprovate più tardi." };

    const { data, error } = await supabase.rpc("fm_submit_quote", {
        p_token: token,
        p_submission: summary,
        p_total: summary.total,
    });

    if (error) {
        console.error("Invio preventivo:", error.message);
        return { ok: false, error: "Invio non riuscito. Riprovate tra poco." };
    }
    if (!data) return { ok: false, error: "Il link è scaduto oppure il preventivo è già stato inviato." };

    // Notifica alla cliente: se non parte, il preventivo resta comunque salvato nel gestionale.
    const existing = await getQuoteByToken(token);
    await sendQuoteEmail(existing?.couple_names || "Coppia", summary);
    return { ok: true, custom: quote.custom };
}