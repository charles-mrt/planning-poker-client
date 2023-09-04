import { getGameById } from "@/app/services/game/get-game-by-id"
import useSWRConfig from "swr"

interface useGetGameByIdProps {
  gameId: string
  gameName?: string
  gameUrl?: string
  gamePlayers?: []
  isLoading?: boolean
}

export const useGetGameById = ({ gameId, gameName, gameUrl, gamePlayers}: useGetGameByIdProps) => {

  const { data: game, error, isValidating, } = useSWRConfig(`${gameId}`, getGameById)

  gameId = game?.id
  gameName = game?.name
  gameUrl = game?.url
  gamePlayers = game?.players
  return {
    gameId: gameId,
    gameName: gameName,
    gameUrl: gameUrl,
    gamePlayers: gamePlayers,
    isLoading: !error && !game,
    isError: error,
    isValidating
  }

}

