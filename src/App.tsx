import { useState } from "react";
import LcdCell from "./components/LcdCell";

export default function App() {
  const createEmptyCell = () =>
    Array.from({ length: 8 }, () => Array(5).fill(false));

  const [allPixels, setAllPixels] = useState<boolean[][][]>(
    Array.from({ length: 32 }, createEmptyCell)
  );

  const ligarTodos = () => {
    const newPixels = allPixels.map((cell) =>
      cell.map((row) => row.map(() => true))
    );
    setAllPixels(newPixels);
  };

  const desligarTodos = () => {
    const newPixels = allPixels.map((cell) =>
      cell.map((row) => row.map(() => false))
    );
    setAllPixels(newPixels);
  };

  const alternarTodos = () => {
    const newPixels = allPixels.map((cell) =>
      cell.map((row) => row.map((bit) => !bit))
    );
    setAllPixels(newPixels);
  };

  return (
    <main className="flex flex-col w-screen h-screen justify-center items-center overflow-hidden bg-neutral-400">
      {/* Versão mobile: apenas 1 célula */}
      <div className="block sm:hidden bg-lime-400 rounded-2xl p-4">
        <LcdCell
          pixels={allPixels[0]}
          setPixels={(p) =>
            setAllPixels((old) => {
              const copy = [...old];
              copy[0] = p;
              return copy;
            })
          }
        />
      </div>

      {/* Versão desktop: 16 colunas com 2 células cada */}
      <div className="hidden sm:flex gap-2 bg-lime-400 px-4 py-8 rounded-2xl">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            {Array.from({ length: 2 }).map((_, j) => {
              const index = i * 2 + j;
              return (
                <LcdCell
                  key={j}
                  reversed={j === 1}
                  pixels={allPixels[index]}
                  setPixels={(p) =>
                    setAllPixels((old) => {
                      const copy = [...old];
                      copy[index] = p;
                      return copy;
                    })
                  }
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex gap-2 justify-between items-center">
        <button
          onClick={ligarTodos}
          className="mt-4 px-4 py-2 rounded bg-green-700 text-white cursor-pointer hover:bg-green-800"
        >
          Ligar Todos
        </button>
        <button
          onClick={desligarTodos}
          className="mt-4 px-4 py-2 rounded bg-green-700 text-white cursor-pointer hover:bg-green-800"
        >
          Desligar todos
        </button>
        <button
          onClick={alternarTodos}
          className="mt-4 px-4 py-2 rounded bg-green-700 text-white cursor-pointer hover:bg-green-800"
        >
          Alternar todos
        </button>
      </div>
    </main>
  );
}
