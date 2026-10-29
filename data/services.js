// Gli 8 servizi di matrimonio, nell'ordine e con la numerazione del sito.
// media.type: "photo" | "video"; media.image: foto in public/ (null = segnaposto);
// media.src: eventuale video in public/ (null = nessun video).
export const services = [
  {
    id: "video",
    number: "01",
    name: "Video",
    title: "Il vostro film",
    text: "Il racconto completo del vostro giorno.",
    includes: [
      "Un film di 10 min",
      "Riprese dai preparativi alla torta",
      "Consegna in alta qualità",
    ],
    media: { type: "video", src: null, image: null, label: null },
  },
  {
    id: "drone",
    number: "02",
    name: "Drone",
    title: "Riprese aeree",
    text: "Riprese della location e di tutta la giornata, in base alle richieste.",
    includes: [
      "Riprese della location e di alcuni momenti su richiesta",
      "Voli autorizzati, nel rispetto delle normative delle zone di volo",
      "Riprese integrate nel film e nel wedding trailer",
    ],
    media: { type: "video", src: null, image: "/servizio-drone.jpg", label: null },
  },
  {
    id: "wedding-trailer",
    number: "03",
    name: "Wedding trailer",
    title: "Il trailer del matrimonio",
    text: "Le emozioni più belle in pochi minuti.",
    includes: [
      "Trailer di 1.30min",
      "Momenti estratti dal film completo, con l'aggiunta di riprese inedite",
      "Formato adatto a pc e smartphone",
    ],
    media: { type: "video", src: null, image: "/servizio-wedding-trailer.jpg", label: null },
  },
  {
    id: "foto",
    number: "04",
    name: "Foto",
    title: "Fotografia di matrimonio",
    text: "Un reportage autentico di tutta la giornata, dai preparativi alla festa, attento ai dettagli e alle emozioni.",
    includes: [
      "Preparativi, cerimonia, ricevimento",
      "Consegna di foto post-prodotte",
      "20 foto post-prodotte consegnate la sera stessa, da condividere subito sui vostri social",
      "Album (su richiesta)",
    ],
    media: { type: "photo", src: null, image: "/servizio-foto.jpg", label: null },
  },
  {
    id: "trailer-in-diretta",
    number: "05",
    name: "Trailer in diretta",
    title: "Video live",
    text: "Un breve trailer emozionale, montato in diretta durante il matrimonio e proiettato subito dopo la torta: i vostri invitati rivivono la giornata insieme a voi.",
    includes: [
      "Trailer di 1min",
      "Montaggio in loco durante il ricevimento",
      "Proiettore e schermo forniti dalla location",
    ],
    media: {
      type: "video",
      src: null,
      image: "/servizio-trailer-in-diretta.jpg",
      label: "Proiezione del trailer dopo la torta",
    },
  },
  {
    id: "discorsi-integrali",
    number: "06",
    name: "Discorsi integrali",
    title: "Ogni parola, senza tagli",
    text: "I discorsi del rito simbolico, ripresi da più angolazioni e montati per intero in un unico file.",
    includes: [
      "Terza camera dedicata, in aggiunta al secondo operatore",
      "Un unico file, separato dal film",
      "Da concordare prima del matrimonio",
    ],
    media: { type: "video", src: null, image: null, label: null },
  },
  {
    id: "videoclip",
    number: "07",
    name: "Videoclip",
    title: "La vostra canzone",
    text: "Un videoclip sulla canzone scelta da voi, cantata da sposi e invitati e proiettata dopo la torta.",
    includes: [
      "Brano scelto dagli sposi",
      "Riprese di sposi e invitati durante la festa che cantano sulle note del brano",
      "Montaggio in giornata, pronto per la proiezione",
    ],
    media: { type: "video", src: null, image: "/servizio-videoclip.jpg", label: null },
  },
  {
    id: "reel-instagram",
    number: "08",
    name: "Reel per Instagram",
    title: "Pensato per i social",
    text: "Un reel breve e ritmato, pronto da pubblicare e condividere sui vostri profili.",
    includes: [
      "Export finale in formato verticale 9:16 e ottimizzato per i social",
      "Reel di 60s",
      "Consegna entro 10 giorni dal matrimonio",
    ],
    media: { type: "video", src: null, image: null, label: "Anteprima reel verticale 9:16" },
  },
];

// Servizio a parte, non numerato e non presente nella griglia dei servizi di matrimonio.
export const anniversary = {
  id: "anniversario",
  label: "Anniversario di matrimonio",
  title: "Ancora sì, dopo tanti anni",
  text: "25 o 50 anni insieme meritano di essere raccontati come il primo giorno: foto e video del vostro anniversario, con lo stesso sguardo autentico e cinematografico.",
  includes: [
    "Nozze d’argento (25 anni) e d’oro (50 anni)",
    "Foto, video o entrambi, in base alle vostre richieste",
  ],
  media: { type: "photo", src: null, image: "/anniversario.jpg", label: null },
};
