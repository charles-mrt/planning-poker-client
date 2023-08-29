import { Header } from './components/Header'
import { Buttonlink } from './components/ButtonLink'


export const metadata = { title: 'Planning Poker' }

export default function Home() {

  return (
    <div className="w-full h-full">
      <Header />
      <main className="h-full w-full flex flex-col items-center justify-center gap-11">

        <div className="text-4xl flex flex-col items-center gap-2">
          <span className="text-gray-800">Bem Vindo ao</span>
          <h1 className="text-purple-700 font-bold">Planning Poker</h1>
        </div>

        <Buttonlink url='/create-game' text='Iniciar um jogo' />
        
        <p className="text-base text-gray-500">Desfrute de uma jornada produtiva e divertida com nossa ferramenta!
          <a className="font-bold text-violet-600 cursor-not-allowed"> Saiba mais</a>
        </p>

      </main>
    </div>
  )
}
