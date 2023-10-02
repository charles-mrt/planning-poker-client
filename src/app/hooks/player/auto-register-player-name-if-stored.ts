import { addPlayer } from "@/app/services/player/add-player";
import { getGameById } from "@/app/services/game/get-game-by-id";

interface handlePlayerNameProps {
  playerNameFromStorage: string
  playerIdFromStorage: string
  gameIdFromUrl: string
}

interface Player {
  player_id: string
}

export const autoRegisterPlayerNameIfStored = async ({ playerNameFromStorage, playerIdFromStorage, gameIdFromUrl }: handlePlayerNameProps) => {

  if (playerNameFromStorage !== "" && playerIdFromStorage !== "") {

    const game = await getGameById(gameIdFromUrl);

    if (game) {
      const player = game.players.find((player: Player) => player.player_id === playerIdFromStorage);

      if (!player) {

        const playerData = await addPlayer({
          player_name: playerNameFromStorage,
          gameId: gameIdFromUrl
        });

        if (playerData) localStorage.setItem("player-id", playerData.playerId)
      }
    }
  }

};