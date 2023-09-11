import { getGameById } from "@/app/services/game/get-game-by-id"
import useSWRConfig from "swr"

interface useGetGameByIdProps {
  gameId: string
  gameName?: string
  gameUrl?: string
  gamePlayers?: []
  gameVotes?: (string | null)[] 
  isLoading?: boolean
}

export const useGetGameById = ({ gameId, gameName, gameUrl, gamePlayers, gameVotes}: useGetGameByIdProps) => {

  const { data: game, error, isValidating, } = useSWRConfig(`${gameId}`, getGameById, { refreshInterval: 1000 })
  
  gameId = game?.id
  gameName = game?.name
  gameUrl = game?.url
  gamePlayers = game?.players
  gameVotes = game?.votes
  
  return {
    gameId: gameId,
    gameName: gameName,
    gameUrl: gameUrl,
    gamePlayers: gamePlayers,
    gameVotes: gameVotes,
    isLoading: !error && !game,
    isError: error,
    isValidating
  }

}

