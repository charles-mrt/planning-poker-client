import Link from "next/link";
import { Header } from "./components/Header";

export default function Home() {

  return (

    <main className="h-full w-full">
      
      <Header userName="" gameName=""/>

      <div className="h-full w-full flex flex-col items-center justify-center gap-11">

        <div className="text-4xl flex flex-col items-center gap-2">
          <span className="text-gray-800">Bem Vindo ao</span>
          <h1 className="text-purple-700 font-bold">Planning Poker</h1>
        </div>

        <Link href="/create-game" className="w-96 bg-violet-700 rounded-md border-violet-700 py-4 px-6 text-white font-bold text-base text-center hover:bg-violet-800 transition-colors">
          Iniciar um jogo
        </Link>

        <p className="text-base text-gray-500">Desfrute de uma jornada produtiva e divertida com nossa ferramenta!
          <a className="font-bold text-violet-600 cursor-not-allowed"> Saiba mais</a>
        </p>
      </div>

    </main>
  )
}
