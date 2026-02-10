export async function POST(req: Request) {
    const { question } = await req.json();

    const res = await fetch(
        process.env.RAG_API_URL + "/ask",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question })
        }
    );

    const data = await res.json();
    return Response.json(data);
}
