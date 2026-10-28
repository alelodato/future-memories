import { revalidateTag } from "next/cache";
import { PORTFOLIO_TAG } from "@/lib/portfolio-tag";

// Chiamata dal gestionale dopo ogni salvataggio per svuotare la cache del portfolio.
export async function POST(request) {
    const secret = request.headers.get("x-revalidate-secret");
    if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
        return Response.json({ ok: false }, { status: 401 });
    }

    revalidateTag(PORTFOLIO_TAG, { expire: 0 });
    return Response.json({ ok: true });
}