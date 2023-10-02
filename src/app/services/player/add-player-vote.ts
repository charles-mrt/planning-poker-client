import api from "@/app/api/axios/api"

interface addPlayerVoteProps {
  gameId: string
  playerId: string
  vote: string | null
}

export const addPlayerVote = async ({ gameId, playerId, vote }: addPlayerVoteProps) => {

  try {
    const playerVote = {
      vote: vote
    }
    const response = await api.patch(`games/${gameId}/players/${playerId}/vote`, playerVote)
   
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