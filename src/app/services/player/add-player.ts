import api from "@/app/api/axios/api"

interface PlayerProps {
  player_name: string
  gameId: string
}

interface Player {
  player_id: string
  name: string
  vote: string | null
}

  export const addPlayer = async (formData: PlayerProps ) => {  
try {
    const response = await api.post(`games/${formData.gameId}/players`, {
      name: formData.player_name
    })
    if (response.status === 201) {
    
      const players: Player[] = response.data.players
      
      const player = players.find(player => player.name === formData.player_name)

      if (player) {
        const playerId = player.player_id
        const playerName = player.name
        const playerVote = player.vote

        return { success: true, playerId, playerName, playerVote }
      }
    }
   

  } catch (error) {
    console.error("error sending data to backend", error)
    throw new Error("Erro interno, tente novamente")
  }
}
