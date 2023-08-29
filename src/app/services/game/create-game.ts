import api from '@/app/api/api'

interface GameProps {
  game_name: string
}

export const createGame = async (formData: GameProps) => {
  try {
    const response = await api.post('/games', {
      name: formData.game_name
    })

    if (response.status === 201) {
      return response.data.id
    }
    
  } catch (error) {
    console.error("error sending data to backend", error)
    throw new Error("Erro interno, tente novamente")
  }
}