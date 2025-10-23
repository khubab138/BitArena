// utils/aiAgent.ts
export const fetchAIMove = async (state: string[] | any[]): Promise<any> => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "tictactoe",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "You are the opponent in a TicTacToe game. You play as 'X'.",
            },
            {
              role: "user",
              content: `I'm playing O and you're playing X. Here's the current game state as a flat array of elements: ${state}.

Each cell is either "O", "X", or null. Please make your move (as X) and return ONLY the updated array in this ** [null, null, null, null, 'O', null, null, null, null]** format — do not include any quotes, text, or code blocks. Just respond with the array.`,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    const splited = content.split(",");

    return splited;
  } catch (error) {
    console.error("Error generating AI move:", error);
    throw error;
  }
};
