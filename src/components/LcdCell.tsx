import { useState } from "react";

export default function LcdCell() {
  const [pixels, setPixels] = useState(
    Array.from({ length: 8 }, () => Array(5).fill(false))
  );

  const handleClick = (row: number, col: number) => {
    setPixels((prev) =>
      prev.map((line, r) =>
        line.map((cell, c) => (r === row && c === col ? !cell : cell))
      )
    );
  };

  return (
    <div className="flex flex-col gap-1 sm:gap-0.5">
      {pixels.map((rowArray, row) => (
        <div key={row} className="flex gap-1 sm:gap-0.5">
          {rowArray.map((isOn, col) => (
            <div
              key={col}
              onClick={() => handleClick(row, col)}
              className={`border-2 rounded-md cursor-pointer
            ${isOn ? "bg-green-950" : "bg-green-600"}
            w-10 h-10 sm:w-4 sm:h-4
          `}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
