import { CreateGameForm } from '@/app/components/CreateGameForm'
import { Header } from '@/app/components/Header'

export default function createGamePage() {

  return (
    <div className="w-full h-full">
      <Header />
      <main className="h-full w-full flex flex-col items-center justify-center gap-11">
        <h1 className="text-4xl text-gray-800">Criar Jogo</h1>
        <CreateGameForm />
      </main >
    </div>
  )
}