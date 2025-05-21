interface LcdCellProps {
  pixels: boolean[][];
  setPixels: (newPixels: boolean[][]) => void;
  reversed?: boolean;
}

export default function LcdCell({ pixels, setPixels, reversed }: LcdCellProps) {
  const handleClick = (row: number, col: number) => {
    const copy = [...pixels];
    copy[row] = [...copy[row]];
    copy[row][col] = !copy[row][col];
    setPixels(copy);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2 w-fit sm:w-24">
        {!reversed && (
          <div className="flex flex-col gap-1">
            <button className="bg-green-950 w-full rounded-xl py-1 cursor-pointer text-white font-semibold hover:bg-emerald-900">
              📑 Copy
            </button>
            <div className="flex">
              <input
                type="text"
                className="px-2 py-1 rounded-md rounded-r-none border-2 border-green-800 bg-green-100 text-green-900 w-full"
                placeholder="A"
              />
              <button className="bg-green-950 w-full rounded-xl rounded-l-none py-1 cursor-pointer hover:bg-emerald-900">
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
                  className={`border-2 rounded-md cursor-pointer
                ${isOn ? "bg-lime-950" : "bg-lime-400"}
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
                />
                <button className="bg-green-950 w-full rounded-xl rounded-l-none py-1 cursor-pointer hover:bg-emerald-900">
                  ⬆️
                </button>
              </div>
              <button className="bg-green-950 w-full rounded-xl py-1 cursor-pointer text-white font-semibold hover:bg-emerald-900">
                📑 Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
