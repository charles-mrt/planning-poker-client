import api from '@/app/api/api'

interface useGetGameInfoProps {
  id: string
  name: string
  url: string
}

export const useGetGameInfo = () => {
  const handleGetGameInfo = async (gameId: string) => {
    try {
      const response = await api.get('/games')

      if (response.status === 200) {
        const games: useGetGameInfoProps[] = response.data
        const game = games.find((game) => game.id === gameId)

        if (game) {
          console.log("Game Name:", game.name)
          console.log("Game URL:", game.url)
          console.log("Game ID:", game.id)
        }
      } 

    } catch (error) {
      console.error("Error getting game information", error)
    }
  }

  return {
    handleGetGameInfo
  }
}
