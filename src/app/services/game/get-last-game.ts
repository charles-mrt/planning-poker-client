import api from '@/app/api/api'

interface GameProps {
  id: string
  name: string
  url: string
}

export const getLastGame = async (): Promise<GameProps | null> => {
  try {
    const response = await api.get('/games')

    if (response.status === 200) {
      const games: GameProps[] = response.data

      if (games.length > 0) {
        const lastGame = games[games.length - 1]
        return lastGame
      }
    }
  } catch (error) {
    console.error('Error getting last created game:', error)
  }

  return null
}
