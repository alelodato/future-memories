import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata = {
  title: "Cookie policy",
  description:
    "Cookie policy di Future Memories: informazioni sui cookie utilizzati dal sito futurememories.it e su come gestire le preferenze di navigazione.",
  alternates: { canonical: "/cookie-policy" },
};

const EMAIL = "futurememories.info@gmail.com";

const h2 = "mt-12 font-serif text-2xl leading-tight lg:mt-14 lg:text-3xl";
const p = "mt-4 leading-relaxed";
const ul = "mt-4 list-disc space-y-2 pl-5 leading-relaxed marker:text-marrone";
const a = "underline hover:text-marrone-medio";

function External({ href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={a}>
      {href}
    </a>
  );
}

export default function CookiePolicyPage() {
  return (
    <section className="bg-crema py-16 lg:py-24">
      <Container className="max-w-3xl">
        <SectionTitle as="h1" size="lg">
          Cookie policy
        </SectionTitle>
        <p className="mt-6 text-sm text-marrone-medio">Ultimo aggiornamento: 4 novembre 2026</p>

        <h2 className={h2}>Cosa sono i cookie</h2>
        <p className={p}>
          {
            "I cookie sono piccoli file di testo che i siti visitati salvano nel browser, per essere riletti nelle visite successive. Possono essere tecnici, cioè necessari al funzionamento del sito, oppure servire a fini statistici, pubblicitari o di profilazione."
          }
        </p>

        <h2 className={h2}>Cookie utilizzati da questo sito</h2>
        <p className={p}>
          {
            "Questo sito non utilizza cookie di profilazione, cookie pubblicitari né strumenti di statistica che consentano di identificarvi. Per questo motivo non viene mostrato un banner per la raccolta del consenso: secondo le Linee guida del Garante per la protezione dei dati personali del 10 giugno 2021, per i soli strumenti tecnici è previsto l'obbligo di informativa, ma non di consenso."
          }
        </p>

        <h2 className={h2}>Memoria tecnica del browser</h2>
        <p className={p}>
          {
            "Il sito può salvare nel vostro browser alcune informazioni strettamente tecniche (ad esempio per non ripetere l'animazione di apertura durante la stessa visita). Queste informazioni non vengono usate per identificarvi o tracciarvi e si cancellano alla chiusura della scheda."
          }
        </p>

        <h2 className={h2}>Contenuti di terze parti</h2>
        <p className={p}>Alcuni contenuti del sito sono forniti da servizi esterni:</p>
        <ul className={ul}>
          <li>
            {
              "Vimeo: i video del portfolio sono riprodotti tramite il lettore di Vimeo con l'opzione \"Do Not Track\" attiva, che disattiva il tracciamento della sessione, cookie compresi. Per riprodurre il video, Vimeo riceve comunque alcuni dati tecnici, come l'indirizzo IP. Informativa di Vimeo: "
            }
            <External href="https://vimeo.com/privacy" />
          </li>
          <li>
            {
              "Behold: le immagini dei post Instagram e la foto del profilo sono mostrate come semplici immagini tramite il servizio Behold, senza script di Instagram. Per caricarle, il browser contatta i server di Behold, che ricevono dati tecnici come l'indirizzo IP. Informativa di Behold: "
            }
            <External href="https://behold.so/privacy" />
          </li>
          <li>
            {
              "Instagram e WhatsApp: i link verso Instagram e WhatsApp portano ai rispettivi servizi, che applicano le proprie informative una volta aperti."
            }
          </li>
        </ul>

        <h2 className={h2}>Come gestire i cookie</h2>
        <p className={p}>
          {
            "Potete consultare, bloccare o cancellare i cookie dalle impostazioni del vostro browser. Le istruzioni sono disponibili nelle guide di Chrome, Safari, Firefox ed Edge. Bloccare i cookie tecnici può impedire il corretto funzionamento di alcune parti del sito."
          }
        </p>

        <h2 className={h2}>Titolare del trattamento</h2>
        <p className={p}>
          Gloria Margarino, P.IVA 17267201006, email{" "}
          <a href={`mailto:${EMAIL}`} className={a}>
            {EMAIL}
          </a>
          . Per maggiori informazioni sul trattamento dei dati personali consultate la{" "}
          <Link href="/privacy-policy" className={a}>
            Privacy policy
          </Link>
          .
        </p>

        <h2 className={h2}>Modifiche</h2>
        <p className={p}>
          {
            "Questa cookie policy può essere aggiornata, ad esempio se vengono aggiunti nuovi servizi al sito. La data dell'ultimo aggiornamento è indicata in alto."
          }
        </p>
      </Container>
    </section>
  );
}
