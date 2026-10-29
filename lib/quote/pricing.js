import {
    EXTRAS,
    MAX_COVERAGE_HOURS,
    PAYMENT_PLAN,
    PHASES,
    PREPARATION_DISCOUNT,
    PRE_POST,
    RULES,
    SERVICES,
} from "@/lib/quote/listino";

// Minuti di copertura tra due orari "HH:MM", anche a cavallo della mezzanotte (14:00 → 01:00 = 11 ore).
export function coverageMinutes(start, end) {
    if (!start || !end) return null;
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const diff = (eh * 60 + em - (sh * 60 + sm) + 1440) % 1440;
    return diff === 0 ? null : diff;
}

export function isCoverageValid(start, end) {
    const minutes = coverageMinutes(start, end);
    return minutes !== null && minutes <= MAX_COVERAGE_HOURS * 60;
}

// Extra disponibili per il servizio scelto.
export function availableExtras(serviceId) {
    if (!RULES.filterExtrasByService || !serviceId) return EXTRAS;
    return EXTRAS.filter((extra) => extra.services.includes(serviceId));
}

// selections: { service, phases: [], extras: [], prePost }
export function computeQuote(selections) {
    const service = SERVICES.find((item) => item.id === selections.service);
    const phases = selections.phases || [];

    if (!service) return { ready: false };

    // Senza rito e ricevimento entrambi spuntati il prezzo non si calcola: preventivo su misura.
    const custom = !(phases.includes("rito") && phases.includes("ricevimento"));
    if (custom) return { ready: true, custom: true, service };

    const removedPreparations = PHASES.filter((phase) => phase.preparation && !phases.includes(phase.id)).length;
    const discountSteps = RULES.discountPerPreparation ? removedPreparations : Math.min(removedPreparations, 1);
    const discountUnits = service.units === 2 && !RULES.fotoVideoDiscountPerService ? 1 : service.units;
    const discount = discountSteps * discountUnits * PREPARATION_DISCOUNT;

    const base = service.price - discount;
    const listPrice = service.listPrice ? service.listPrice - discount : null;

    const allowed = availableExtras(service.id);
    const extras = allowed.filter((extra) => (selections.extras || []).includes(extra.id));
    const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);

    const prePost = PRE_POST.find((item) => item.id === selections.prePost) || null;
    const total = base + extrasTotal + (prePost ? prePost.price : 0);

    // Rate arrotondate al centesimo; il saldo assorbe gli arrotondamenti.
    const installments = PAYMENT_PLAN.map((step) => ({ ...step, amount: Math.round(total * step.share * 100) / 100 }));
    const last = installments[installments.length - 1];
    last.amount = Math.round((total - installments.slice(0, -1).reduce((sum, step) => sum + step.amount, 0)) * 100) / 100;

    return { ready: true, custom: false, service, base, listPrice, discount, extras, extrasTotal, prePost, total, installments };
}

const euro = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });

export function formatEuro(value) {
    return euro.format(value);
}