import api from "@/app/api/axios/api"

export const getGameVotes = async (gameId: string) => {
  try {
    const response = await api.get(`/games/${gameId}`)

    if (response.status === 200) {
      const votes = response.data.players
      
      const formattedVotes = votes.map((vote:any) => vote.vote)
     
      return formattedVotes 
    }
  } catch (error) {
    console.error('(error get votes) Error getting game votes:', error)
  }

  return []
}
