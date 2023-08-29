import api from '@/app/api/api'

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
}
export const getGameById = async (id:string): Promise<GameProps | null | any> => {

 
  try {
    const response = await api.get(`/games/${id}`)

    if (response.status === 200) {
      const games: GameProps[] = response.data
      
      const game = games.find((game) => game.id === id)
      
      if (game) return game      
    }
  } catch (error) {
    console.log("Error getting game with ID")
  }
  
}
