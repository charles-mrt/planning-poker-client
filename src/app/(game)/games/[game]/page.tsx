
import { CardNames } from '@/app/components/Card/Card-names'
import { Header } from '@/app/components/Header'
import { getLastGame } from '@/app/services/game/get-last-game'
import { getUser } from '@/app/services/user/get-user'

export default async function Game() {
  
  const users = await getUser()
  const user = users[0]
  const game = await getLastGame()

    return (
      <div className="w-full h-full">
        <Header userName={user?.name} gameName={game?.name} />        
        <main className="h-full w-full flex flex-col items-center justify-center gap-11">
          <h1 className="text-4xl text-gray-800">Selecione suas cartas!</h1>
          <CardNames />
        </main>
      </div>
    )
  }
