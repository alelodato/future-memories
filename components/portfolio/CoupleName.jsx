/** "Giulia & Marco" con la & in corsivo. */
export default function CoupleName({ couple }) {
    const parts = couple.split("&");
    if (parts.length !== 2) return couple;
    return (
        <>
            {parts[0].trim()} <em>&amp;</em> {parts[1].trim()}
        </>
    );
}