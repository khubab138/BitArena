import { useEffect, useState } from "react";

interface HintBoxProps {
  word: string;
}

const HintBoxEmoji = ({ word }: HintBoxProps) => {
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHint = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/hintEmoji", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ word }),
        });

        const data = await res.json();
        const content = data.hint || "No response";
        setAnswer(content);
      } catch (err) {
        console.error("Error fetching hint:", err);
        setAnswer("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (word) {
      fetchHint();
    }
  }, [word]);

  return <div> {loading ? "hint..." : answer}</div>;
};

export default HintBoxEmoji;
