import api from "@/app/api/axios/api"

interface GameProps {
  id: string
  name: string
  url: string
}

export const getAllGames = async (): Promise<GameProps[]> => {
  try {
    const response = await api.get('/games')

    if (response.status === 200) {
      const games: GameProps[] = response.data
      return games
    }
  } catch (error) {
    console.error('Error getting all games:', error)
  }

  return []
}
