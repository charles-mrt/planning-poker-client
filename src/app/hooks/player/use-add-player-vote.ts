import { addPlayerVote } from "@/app/services/player/add-player-vote"

  export const useAddPlayerVote = async () => {

    const playerId = localStorage.getItem('player-id')
    const playerVote = localStorage.getItem('player-vote')
    const gameId = localStorage.getItem('game-id')

    if (!playerId || !playerVote) {
      console.error('Player ID or vote is missing')
      return
    }
    
    try {
    
      const response = await addPlayerVote({
        gameId: gameId ?? '', 
        playerId: playerId,
        vote: playerVote, 
      })
      
      if (response?.playerId && response.playerName && response.playerVote) {
        localStorage.setItem('player-name', response.playerName)
        localStorage.setItem('player-vote', response.playerVote)
      }
      
    } catch (error) {
      console.error('(error send vote) Erro ao enviar voto para backend', error)
    }
  }
