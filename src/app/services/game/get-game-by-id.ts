import api from "@/app/api/axios/api"

interface Player {
  id: string
  name: string
  vote?: string | null
}

interface GameProps {
  id: string
  name: string
  url: string
  players: Player[]
  votes: (string | null)[]
}
export const getGameById = async (id:string): Promise<GameProps | null | any> => {

  try {
    const response = await api.get(`/games/${id}`)

    if (response.status === 200) {
      
      const responseData = response.data
      const votes = responseData.players.map((player: Player) => player.vote)

      const gameData: GameProps = {
        id: responseData.id,
        name: responseData.name,
        url: responseData.url,
        players: responseData.players,
        votes: votes,
      }
     
      return gameData
    }

  } catch (error) {
    console.log("(error get game) Error getting game with ID")
  }
  
}
