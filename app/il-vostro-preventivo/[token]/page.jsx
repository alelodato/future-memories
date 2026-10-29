import { Suspense } from "react";
import { notFound } from "next/navigation";
import QuoteConfigurator from "@/components/quote/QuoteConfigurator";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { site } from "@/data/site";
import { getQuoteByToken } from "@/lib/quote/quotes";

export const metadata = {
    title: "Il vostro preventivo",
    robots: { index: false, follow: false },
};

export default function QuotePage({ params }) {
    return (
        <Suspense fallback={<div className="min-h-[70vh] bg-sabbia" />}>
            <QuoteContent params={params} />
        </Suspense>
    );
}

async function QuoteContent({ params }) {
    const { token } = await params;
    const quote = await getQuoteByToken(token);
    if (!quote) notFound();

    if (quote.status === "compilato") {
        return (
            <QuoteMessage
                title={<>Preventivo <em>già inviato</em></>}
                text="Abbiamo già ricevuto le vostre scelte. Per qualsiasi modifica scriveteci su WhatsApp."
            />
        );
    }

    if (quote.expired) {
        return (
            <QuoteMessage
                title={<>Il link è <em>scaduto</em></>}
                text="Il preventivo era valido 10 giorni. Scriveteci e vi invieremo un nuovo link."
            />
        );
    }

    return <QuoteConfigurator token={token} coupleNames={quote.couple_names} expiresAt={quote.expires_at} />;
}

function QuoteMessage({ title, text }) {
    return (
        <section className="bg-sabbia py-20 lg:py-28">
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="font-serif text-5xl leading-tight lg:text-6xl">{title}</h1>
                    <p className="mt-6 leading-relaxed text-marrone-medio lg:text-lg">{text}</p>
                    <div className="mt-10">
                        <Button href={site.whatsappHref} variant="outline">Scrivici su WhatsApp</Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}