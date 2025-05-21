import LcdCell from "./components/LcdCell";

export default function App() {
  return (
    <main className="flex w-screen h-screen justify-center items-center overflow-hidden">
      {/* Versão mobile: apenas 1 célula */}
      <div className="block sm:hidden bg-green-600 ">
        <LcdCell />
      </div>

      {/* Versão desktop: 16 colunas com 2 células cada */}
      <div className="hidden sm:flex gap-2 bg-green-600 px-4 py-8">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            {Array.from({ length: 2 }).map((_, j) => (
              <LcdCell key={j} />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
