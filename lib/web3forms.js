const ENDPOINT = "https://api.web3forms.com/submit";

/** Invia i dati del modulo a Web3Forms. Ritorna { ok, message }. */
export async function submitToWeb3Forms(fields) {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!accessKey) {
    console.error("NEXT_PUBLIC_WEB3FORMS_KEY non impostata: invio del modulo disattivato.");
    return { ok: false, message: "missing-key" };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: accessKey, ...fields }),
    });
    const result = await response.json();
    return { ok: Boolean(result.success), message: result.message };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}
