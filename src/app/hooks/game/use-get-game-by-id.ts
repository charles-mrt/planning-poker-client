import { getGameById } from "@/app/services/game/get-game-by-id";

interface GameData {
  gameId: string;
  gameName?: string;
  gameUrl?: string;
  gamePlayers?: [];
  gameVotes?: (string | null)[];
}

export const useGetGameById = async ({ gameId }: { gameId: string }): Promise<GameData | null> => {

  try {
    const response = await getGameById(gameId)

    return {
      gameId: response.id,
      gameName: response.name,
      gameUrl: response.url,
      gamePlayers: response.players,
      gameVotes: response.votes,
    }

  } catch (error) {
    console.error("Erro ao buscar jogo por ID:", error)
    return null
  }
}
