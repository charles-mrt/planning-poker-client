import { Dices } from "lucide-react"
import { Buttonlink } from "../ButtonLink"
import { ErrorMessage } from "../Error-message"
import { Header } from "../Header"

export const GameNotFound = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-10">
      <h1 className="flex items-center gap-2 text-6xl font-bold text-gray-700">
        <Dices />Oops!
      </h1>
      <Header gameName="jogo não encontrado" />
      <ErrorMessage message='Erro 404. Jogo não encontrado!' />
      <Buttonlink url='/create-game' text='Iniciar um jogo?' />
    </div>
  )
}