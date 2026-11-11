import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Privacy policy",
  description:
    "Informativa privacy di Future Memories: come vengono trattati i dati personali inviati tramite il sito, il modulo di contatto e la richiesta di preventivo.",
  alternates: { canonical: "/privacy-policy" },
};

const EMAIL = "futurememories.info@gmail.com";

const h2 = "mt-12 font-serif text-2xl leading-tight lg:mt-14 lg:text-3xl";
const p = "mt-4 leading-relaxed";
const ul = "mt-4 list-disc space-y-2 pl-5 leading-relaxed marker:text-marrone";
const a = "underline hover:text-marrone-medio";

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-crema py-16 lg:py-24">
      <Container className="max-w-3xl">
        <SectionTitle as="h1" size="lg">
          Privacy policy
        </SectionTitle>
        <p className="mt-6 text-sm text-marrone-medio">Ultimo aggiornamento: 4 novembre 2026</p>

        <p className="mt-8 leading-relaxed">
          {
            "Questa informativa descrive come vengono trattati i dati personali di chi visita il sito www.futurememories.it e ne utilizza i moduli, ai sensi dell'art. 13 del Regolamento (UE) 2016/679 (\"GDPR\")."
          }
        </p>

        <h2 className={h2}>Titolare del trattamento</h2>
        <p className={p}>
          Gloria Margarino, P.IVA 17267201006, email{" "}
          <a href={`mailto:${EMAIL}`} className={a}>
            {EMAIL}
          </a>
          .
        </p>

        <h2 className={h2}>Quali dati trattiamo</h2>
        <ul className={ul}>
          <li>
            {
              "Dati di navigazione: durante la visita, i sistemi che ospitano il sito registrano automaticamente alcuni dati tecnici, come indirizzo IP, tipo di browser, pagine visitate, data e ora della richiesta. Servono a far funzionare il sito e a garantirne la sicurezza."
            }
          </li>
          <li>
            {
              "Richiesta di preventivo dal sito: nome e cognome, email, telefono, data dell'evento (se già decisa) ed eventuale messaggio."
            }
          </li>
          <li>
            {
              "Preventivo personalizzato: compilando il modulo raggiungibile dal link personale che vi inviamo, trattiamo i vostri nomi e le scelte indicate (data, orari, luoghi e tipo di cerimonia, numero di invitati, servizi ed extra selezionati, totale indicativo)."
            }
          </li>
          <li>
            {
              "Contatti diretti: i dati che scegliete di comunicarci scrivendoci via email, WhatsApp o Instagram, o telefonandoci."
            }
          </li>
        </ul>

        <h2 className={h2}>Perché li trattiamo e su quale base giuridica</h2>
        <ul className={ul}>
          <li>
            {
              "Rispondere alle vostre richieste e preparare i preventivi: misure precontrattuali adottate su vostra richiesta (art. 6, par. 1, lett. b, GDPR)."
            }
          </li>
          <li>
            {
              "Gestire il servizio concordato e i relativi pagamenti: esecuzione del contratto (art. 6, par. 1, lett. b, GDPR)."
            }
          </li>
          <li>
            {
              "Adempiere agli obblighi fiscali e contabili, come l'emissione delle fatture: obbligo di legge (art. 6, par. 1, lett. c, GDPR)."
            }
          </li>
          <li>
            {
              "Garantire il funzionamento e la sicurezza del sito: legittimo interesse del titolare (art. 6, par. 1, lett. f, GDPR)."
            }
          </li>
        </ul>
        <p className={p}>
          {
            "I campi indicati come obbligatori nei moduli sono necessari per rispondervi: senza di essi non possiamo dare seguito alla richiesta."
          }
        </p>

        <h2 className={h2}>Come vengono trattati e chi li riceve</h2>
        <p className={p}>
          {
            "I dati sono trattati con strumenti informatici e protetti con misure di sicurezza adeguate. Non vengono venduti né ceduti a terzi per finalità di marketing. Per il funzionamento del sito ci avvaliamo dei seguenti fornitori, che trattano i dati per nostro conto come responsabili del trattamento:"
          }
        </p>
        <ul className={ul}>
          <li>Vercel (Stati Uniti): hosting del sito;</li>
          <li>
            Supabase: database in cui sono salvati i preventivi personalizzati e archivio da cui vengono caricati foto e
            video del portfolio;
          </li>
          <li>Resend (Stati Uniti): invio delle email di notifica delle richieste;</li>
          <li>Google (servizio Gmail): casella email in cui riceviamo le richieste.</li>
        </ul>
        <p className={p}>
          Il sito mostra inoltre contenuti di Vimeo (video) e Behold (immagini dei post Instagram): per caricarli, il
          browser contatta i loro server, come descritto nella{" "}
          <Link href="/cookie-policy" className={a}>
            Cookie policy
          </Link>
          .
        </p>

        <h2 className={h2}>{"Trasferimento dei dati fuori dall'Unione europea"}</h2>
        <p className={p}>
          {
            "Alcuni fornitori hanno sede negli Stati Uniti. In questi casi il trasferimento avviene sulla base delle garanzie previste dal GDPR, come la decisione di adeguatezza della Commissione europea per le società aderenti all'EU-U.S. Data Privacy Framework o le clausole contrattuali standard approvate dalla Commissione."
          }
        </p>

        <h2 className={h2}>Per quanto tempo li conserviamo</h2>
        <ul className={ul}>
          <li>
            {
              "Richieste e preventivi non seguiti da un accordo: per il tempo necessario a gestirli e comunque non oltre 12 mesi."
            }
          </li>
          <li>
            {
              "Dati relativi ai servizi concordati: per la durata del rapporto e, per i documenti contabili e fiscali, per 10 anni, come previsto dalla legge."
            }
          </li>
          <li>
            {"Dati di navigazione: per il tempo previsto dal fornitore di hosting per finalità di sicurezza."}
          </li>
        </ul>

        <h2 className={h2}>I vostri diritti</h2>
        <p className={p}>
          {
            "In qualsiasi momento potete chiederci l'accesso ai vostri dati, la loro rettifica o cancellazione, la limitazione del trattamento e la portabilità, e opporvi al trattamento basato sul legittimo interesse (artt. 15-22 GDPR), scrivendo a "
          }
          <a href={`mailto:${EMAIL}`} className={a}>
            {EMAIL}
          </a>
          . Avete inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali (
          <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className={a}>
            https://www.garanteprivacy.it
          </a>
          ).
        </p>

        <h2 className={h2}>Nessuna decisione automatizzata</h2>
        <p className={p}>
          {"I vostri dati non sono utilizzati per decisioni automatizzate né per attività di profilazione."}
        </p>

        <h2 className={h2}>Cookie</h2>
        <p className={p}>
          Per le informazioni sui cookie e sugli strumenti tecnici utilizzati dal sito, consultate la{" "}
          <Link href="/cookie-policy" className={a}>
            Cookie policy
          </Link>
          .
        </p>

        <h2 className={h2}>Modifiche</h2>
        <p className={p}>
          {
            "Questa informativa può essere aggiornata, ad esempio se cambiano i servizi del sito o i fornitori. La data dell'ultimo aggiornamento è indicata in alto."
          }
        </p>
      </Container>
    </section>
  );
}
