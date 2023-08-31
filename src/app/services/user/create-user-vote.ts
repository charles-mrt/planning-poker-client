import api from '@/app/api/api'

interface createUserVote {
  gameId: string
  playerId: string
  vote: string
}

export const createUserVote = async ({ gameId, playerId, vote }: createUserVote) => {
}