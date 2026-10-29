// Listino del preventivo Future Memories. Prezzi in euro.
// Per aggiornare un prezzo o una regola si modifica solo questo file.

export const MAX_COVERAGE_HOURS = 10;
export const PREPARATION_DISCOUNT = 200; // per ogni preparazione tolta, per servizio
export const VALIDITY_DAYS = 10;

// Regole del calcolo.
export const RULES = {
    // Foto + Video senza una preparazione: true = 200 € in meno per ciascun servizio (400 €), false = 200 € una volta
    // DA CONFERMARE con la cliente
    fotoVideoDiscountPerService: true,
    // Senza entrambe le preparazioni: true = lo sconto si applica due volte, false = una volta sola
    // DA CONFERMARE con la cliente
    discountPerPreparation: true,
    // Confermato: Foto mostra solo gli extra foto, Video solo quelli video, Foto + Video tutti
    filterExtrasByService: true,
};

export const SERVICES = [
    { id: "foto", label: "Foto", baseLabel: "Foto · 2 operatori", price: 1600, units: 1 },
    { id: "video", label: "Video", baseLabel: "Video · 2 operatori", price: 1600, units: 1 },
    { id: "fotoVideo", label: "Foto + Video", baseLabel: "Foto + Video · 4 operatori", listPrice: 3200, price: 2900, units: 2 },
];

export const INCLUDES = {
    foto: {
        title: "Servizio fotografico",
        subtitle: "Fotografia completa",
        items: [
            "2 fotografi professionisti presenti per tutto l'evento",
            "Copertura completa: preparazione sposi, rito, esterne e ricevimento",
            "Consegna di tutte le foto, senza limiti, in alta risoluzione tramite link digitale",
            "20 foto in anteprima inviate la sera stessa dell'evento",
        ],
    },
    video: {
        title: "Servizio video",
        subtitle: "Videomaking completo",
        items: [
            "2 videomaker professionisti per l'intera giornata",
            "Copertura completa: preparazione sposi, rito, esterne e ricevimento",
            "Montaggio video cinematic da 10 minuti + trailer emozionale di 1-2 minuti",
            "Video completo e trailer consegnati in alta definizione tramite link digitale",
        ],
    },
};

export const PHASES = [
    { id: "prepSposa", label: "Preparazione sposa", preparation: true },
    { id: "prepSposo", label: "Preparazione sposo", preparation: true },
    { id: "rito", label: "Rito" },
    { id: "ricevimento", label: "Ricevimento" },
];

export const CEREMONY_TYPES = ["Laico", "Religioso"];

// "group": gli extra con lo stesso gruppo sono alternativi (se ne sceglie uno solo).
// "services": servizi con cui l'extra compare.
export const EXTRAS = [
    { id: "drone", label: "Drone", price: 300, description: "Dal rito fino all'inizio del ricevimento.", group: "drone", services: ["video", "fotoVideo"] },
    { id: "droneCompleto", label: "Drone copertura completa", price: 400, description: "Dalla preparazione al taglio della torta, con un operatore dedicato solo a questa mansione.", group: "drone", services: ["video", "fotoVideo"] },
    { id: "discorsi", label: "Discorsi integrali", price: 350, description: "Discorsi pronunciati durante il rito, ripresi da più angolazioni e montati in versione integrale con unico export.", services: ["video", "fotoVideo"] },
    { id: "videoclip", label: "Videoclip cantato", price: 400, description: "Montaggio di un video cantato da sposi e invitati, proiettabile dopo la torta.", services: ["video", "fotoVideo"] },
    { id: "trailerLive", label: "Wedding trailer live", price: 550, description: "Montaggio e consegna rapida di 1 minuto, proiettabile durante la festa.", services: ["video", "fotoVideo"] },
    { id: "reel", label: "Reel Instagram", price: 150, description: "Video breve per la pubblicazione social (durata: 45-60 secondi).", services: ["video", "fotoVideo"] },
    { id: "album", label: "Album fotografico rigido 20x30", price: 250, services: ["foto", "fotoVideo"] },
    { id: "magazine", label: "Magazine morbido 20x30", price: 150, services: ["foto", "fotoVideo"] },
];

export const PRE_POST = [
    { id: "foto", label: "Solo foto", price: 300 },
    { id: "video", label: "Solo video", price: 300 },
    { id: "fotoVideo", label: "Foto + video", price: 500 },
];

export const PAYMENT_PLAN = [
    { id: "acconto1", label: "Acconto 20%", share: 0.2, due: "entro 10 giorni dalla richiesta del preventivo" },
    { id: "acconto2", label: "Acconto 60%", share: 0.6, due: "entro 5 giorni prima del matrimonio" },
    { id: "saldo", label: "Saldo 20%", share: 0.2, due: "alla consegna" },
];

export const TEXTS = {
    coverageNote:
        "Il servizio comprende fino a 10 ore di copertura nell'arco della giornata. Eventuali ore aggiuntive possono essere concordate a parte.",
    customQuote:
        "Per questa soluzione prepariamo un preventivo su misura: inviateci la richiesta e vi contatteremo entro 24 ore.",
    validity:
        "Preventivo valido 10 giorni: dopo questa data le tariffe potrebbero subire variazioni in base alla disponibilità e alle richieste del periodo.",
};