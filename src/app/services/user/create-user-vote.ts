import api from '@/app/api/api'

interface createUserVote {
  gameId: string
  playerId: string
  vote: string
}

export const createUserVote = async ({ gameId, playerId, vote }: createUserVote) => {

  try {
    const response = await api.patch(`games/${gameId}/players/${playerId}/vote/`, vote)

    if (response.status === 200) {
      const playerId = response.data.id
      const playerName = response.data.name
      const playerVote = response.data.vote
      return { playerId, playerName, playerVote }
    }
    
  } catch (error) {
    console.error("(player vote) - error sending data to backend", error)
    throw new Error("Erro interno, tente novamente")
  }
}