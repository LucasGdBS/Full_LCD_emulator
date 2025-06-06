import { useState } from "react";
import { CHARS } from "../utils/chars";

interface LcdCellProps {
  pixels: boolean[][];
  setPixels: (newPixels: boolean[][]) => void;
  reversed?: boolean;
}

export default function LcdCell({ pixels, setPixels, reversed }: LcdCellProps) {
  const [inputValue, setInputValue] = useState("");
  const [copied, setCopied] = useState(false);

  const handleClick = (row: number, col: number) => {
    const copy = [...pixels];
    copy[row] = [...copy[row]];
    copy[row][col] = !copy[row][col];
    setPixels(copy);
  };

  const handleSend = (char: string) => {
    if (char.length === 1 && CHARS[char]) {
      setPixels(CHARS[char]);
      setInputValue("");
    } else {
      setPixels(
        Array.from({ length: pixels.length }, () =>
          Array(pixels[0].length).fill(false)
        )
      );
    }
  };

  function generateCCode(pixels: boolean[][]): string {
    const linhas = pixels.map((linha) => {
      const bits = linha.map((pixel) => (pixel ? "1" : "0")).join("");
      return `  B${bits},`;
    });

    return `byte customChar[] = {\n${linhas.join("\n")}\n};`;
  }

  const copyToClipboard = () => {
    const codigo = generateCCode(pixels);
    navigator.clipboard.writeText(codigo).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <div
        className={`flex flex-col items-center gap-2 w-fit sm:w-24 ${
          inputValue.toLowerCase() === "spin" && "animate-spin"
        }`}
      >
        {!reversed && (
          <div className="flex flex-col gap-1">
            <button
              className="bg-green-950 w-full rounded-xl py-1 cursor-pointer text-white font-semibold hover:bg-emerald-900"
              onClick={copyToClipboard}
            >
              {copied ? "✅ Copiado!" : "📑 Copy"}
            </button>
            <div className="flex">
              <input
                type="text"
                className="px-2 py-1 rounded-md rounded-r-none border-2 border-green-800 bg-green-100 text-green-900 w-full"
                placeholder="A"
                value={inputValue}
                onChange={(e) => {
                  const char = e.target.value;
                  setInputValue(char);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend(inputValue);
                  }
                }}
              />
              <button
                className="bg-green-950 w-full rounded-xl rounded-l-none py-1 cursor-pointer hover:bg-emerald-900"
                onClick={() => handleSend(inputValue)}
              >
                ⬇️
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1 sm:gap-0.5">
          {pixels.map((rowArray, row) => (
            <div key={row} className="flex gap-1 sm:gap-0.5">
              {rowArray.map((isOn, col) => (
                <div
                  key={col}
                  onClick={() => handleClick(row, col)}
                  className={`border-2 border-green-800 rounded-md cursor-pointer
                ${isOn ? "bg-lime-950 border-lime-950" : "bg-lime-400"}
                w-10 h-10 sm:w-4 sm:h-4
                `}
                ></div>
              ))}
            </div>
          ))}
        </div>
        {reversed && (
          <div className="flex flex-col items-center gap-2 w-fit sm:w-24">
            <div className="flex flex-col gap-1">
              <div className="flex">
                <input
                  type="text"
                  className="px-2 py-1 rounded-md rounded-r-none border-2 border-green-800 bg-green-100 text-green-900 w-full"
                  placeholder="A"
                  value={inputValue}
                  onChange={(e) => {
                    const char = e.target.value;
                    setInputValue(char);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSend(inputValue);
                    }
                  }}
                />
                <button
                  className="bg-green-950 w-full rounded-xl rounded-l-none py-1 cursor-pointer hover:bg-emerald-900"
                  onClick={() => handleSend(inputValue)}
                >
                  ⬆️
                </button>
              </div>
              <button
                className="bg-green-950 w-full rounded-xl py-1 cursor-pointer text-white font-semibold hover:bg-emerald-900"
                onClick={copyToClipboard}
              >
                {copied ? "✅ Copiado!" : "📑 Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
