import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { word } = await req.json();

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AI_SECRET_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "HangmanAI",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI in a Hangman game.",
            },
            {
              role: "user",
              content: `Create an  hint in  Emoji for the word: ${word}. Just the emoji, no extra message`,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const hint = data.choices?.[0]?.message?.content || "No hint found.";
    return NextResponse.json({ hint });
  } catch (error) {
    console.error("Error generating hint:", error);
    return NextResponse.json(
      { error: "Failed to generate hint." },
      { status: 500 }
    );
  }
}
