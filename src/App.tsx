import { useState } from "react";
import LcdCell from "./components/LcdCell";
import Footer from "./components/Footer";

export default function App() {
  const createEmptyCell = () =>
    Array.from({ length: 8 }, () => Array(5).fill(false));

  const [allPixels, setAllPixels] = useState<boolean[][][]>(
    Array.from({ length: 32 }, createEmptyCell)
  );
  const [copied, setCopied] = useState(false);

  const turnOnAllPixels = () => {
    const newPixels = allPixels.map((cell) =>
      cell.map((row) => row.map(() => true))
    );
    setAllPixels(newPixels);
  };

  const turnOffAll = () => {
    const newPixels = allPixels.map((cell) =>
      cell.map((row) => row.map(() => false))
    );
    setAllPixels(newPixels);
  };

  const toggleAllPixels = () => {
    const newPixels = allPixels.map((cell) =>
      cell.map((row) => row.map((bit) => !bit))
    );
    setAllPixels(newPixels);
  };

  const generateCCode = () => {
    const linhaDeCima = [];
    const linhaDeBaixo = [];

    for (let i = 0; i < 16; i++) {
      linhaDeCima.push(allPixels[i * 2]);
      linhaDeBaixo.push(allPixels[i * 2 + 1]);
    }

    const todasCelulas = [...linhaDeCima, ...linhaDeBaixo];

    return todasCelulas
      .map((cell, index) => {
        const bytes = cell.map(
          (row) => "B" + row.map((pixel) => (pixel ? "1" : "0")).join("")
        );
        return `byte customChar${index}[] = {\n  ${bytes.join(",\n  ")}\n};`;
      })
      .join("\n\n");
  };

  const copyAllCells = async () => {
    const codigo = generateCCode();
    await navigator.clipboard.writeText(codigo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative h-screen w-full bg-neutral-400 overflow-hidden">
      <main className="flex flex-col w-full justify-center items-center py-10 px-4 bg-neutral-400 pb-24 gap-5 sm:gap-10">
        <h1 className="text-3xl font-semibold text-green-950 text-center px-4">
          LCD {window.innerWidth < 640 ? "1x1" : "16x2"} Emulator
        </h1>

        {/* Versão mobile: apenas 1 célula */}
        <div className="block sm:hidden bg-lime-400 rounded-2xl p-4 max-w-full">
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
        <div className="hidden sm:flex flex-wrap justify-center gap-2 bg-lime-400 px-4 py-8 rounded-2xl overflow-x-auto max-w-full">
          <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 max-w-full">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2 flex-shrink-0">
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
        </div>

        <div className="flex gap-2 justify-center items-center w-full px-4">
          <button
            onClick={turnOnAllPixels}
            className="mt-2 px-4 py-2 rounded bg-green-700 text-white cursor-pointer hover:bg-green-800"
          >
            Ligar Todos
          </button>
          <button
            onClick={turnOffAll}
            className="mt-2 px-4 py-2 rounded bg-green-700 text-white cursor-pointer hover:bg-green-800"
          >
            Desligar todos
          </button>
          <button
            onClick={toggleAllPixels}
            className="mt-2 px-4 py-2 rounded bg-green-700 text-white cursor-pointer hover:bg-green-800"
          >
            Alternar todos
          </button>
          <button
            onClick={copyAllCells}
            className="mt-2 px-4 py-2 rounded bg-green-700 text-white font-semibold cursor-pointer hover:bg-emerald-800"
          >
            {copied ? "✅ Copiado!" : "Copiar tudo"}
          </button>
        </div>
      </main>
      <footer className="fixed bottom-0 w-full hidden sm:block">
        <Footer />
      </footer>
    </div>
  );
}
