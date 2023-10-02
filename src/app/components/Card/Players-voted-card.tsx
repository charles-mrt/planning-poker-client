import Image from "next/image"
import card from '/public/assets/card-cover.png'
import useDelayedReveal from "./hook/useDelayedReveal"

interface PlayersVotedCardProps {
  cardRevealed: boolean 
  playerVote: string
  playerName: string
}

export const PlayersVotedCard = ({ cardRevealed, playerVote, playerName }: PlayersVotedCardProps) => {
  const isCardRevealed = useDelayedReveal(cardRevealed)

  return (
    <div className="flex flex-col items-center">
      {!isCardRevealed ? (

        <div className="custom-transition w-10 h-16 rounded-md border-2 border-gray-300 bg-gradient-to-t from-gray-400 to-gray-200">
          {playerVote !== "" && playerVote !== null ? (
            <Image
              src={card}
              alt="card"
              className="object-center w-full h-full"
            /> 
          ) : null}
        </div>

      ) : (

        <div
          id="flip-card"
          className=" w-10 h-16 rounded-[4px] flex items-center justify-center border-2 bg-gradient-to-b from-cyan-500 to-blue-500 -translate-y-2  border-blue-500 cursor-pointer">
          <span id="flip-card" className="text-white font-bold text-xl uppercase">
            {playerVote}
          </span>
        </div>
      )}

      <span className="whitespace-pre-line text-xs capitalize">
        {playerName}
      </span>

    </div>
  )
}