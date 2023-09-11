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
      const gameId = response.data.id 
      const gameName = response.data.name    
      return {gameId, gameName}
    }
  } catch (error) {
    console.error('(create game) error sending data to backend', error)
    throw new Error('Erro interno, tente novamente')
  }
}
