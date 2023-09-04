
import { createUserVote } from '@/app/services/user/create-user-vote'

  export const handleUserVote = async () => {

    const userId = localStorage.getItem('user-id')
    const userVote = localStorage.getItem('user-vote')
    const gameId = localStorage.getItem('game-id')

    if (!userId || !userVote) {
      console.error('User ID or vote is missing')
      return
    }
    
    try {
    
      const response = await createUserVote({
        gameId: gameId ?? '', 
        playerId: userId,
        vote: userVote, 
      })
      
      if (response?.playerId && response.playerName && response.playerVote) {
        localStorage.setItem('user-name', response.playerName)
        localStorage.setItem('user-vote', response.playerVote)
      }
      
    } catch (error) {
      console.error('Erro ao enviar voto para backend', error)
    }
  }
