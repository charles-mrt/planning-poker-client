import api from "@/app/api/axios/api"

interface PlayerProps {
  id: string
  name: string
  vote?: string | null
}

export const getPlayer = async (gameId:string): Promise<PlayerProps[]> => {

  try {
    const response = await api.get(`games/${gameId}/players`)

    if (response.status === 200) {
      const player: PlayerProps[] = response.data               
      return player
    }
  } catch (error) {
    console.error('Error getting player:', error)
  }

  return []
}
