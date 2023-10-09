import React, { useState, useEffect } from "react"

import { Card } from "./Card"
import { CardsTobeVoted } from "./Cards-tobe-voted"
import useDelayedReveal from "./hook/useDelayedReveal"
import socket from "@/app/api/socket/auth"

interface CardsVotedProps {
  cardRevealed: boolean
  gameVotes: (string | null)[]
}

interface PlayersProps {
  vote: string
}

export const CardsContaniner = ({ cardRevealed, gameVotes }: CardsVotedProps) => {

  const [voteCounts, setVoteCounts] = useState<{ [vote: string]: number }>({})
  const isCardRevealed = useDelayedReveal(cardRevealed)

  const [socketGameVotes, setSocketGameVotes] = useState<(string | null)[]>([]);

  socket.on('update-game', (game) => {
    if (game && game.players) {
      const playerData:[] = game.players.map((player: PlayersProps) => ({
        vote: player.vote
      }))
      const votes = playerData.map((player: PlayersProps) => player.vote)
      setSocketGameVotes(votes)
    }
  })

  const countVotes = (votes: (string | null)[]) => {
    const newVoteCounts: { [vote: string]: number } = {}

    votes.forEach((gameVote) => {
      const vote = gameVote as string
      newVoteCounts[vote] = (newVoteCounts[vote] || 0) + 1
    })
    return newVoteCounts
  }

  const findWinningVotes = () => {
    let mostPopularVotes: string[] = []
    let highestCount = 0

    Object.entries(voteCounts).forEach(([vote, count]) => {
      if (count > highestCount) {
        mostPopularVotes = [vote]
        highestCount = count
      } else if (count === highestCount) {
        mostPopularVotes.push(vote)
      }
    })

    return mostPopularVotes
  }

  useEffect(() => {
    if (cardRevealed) {
      const newVoteCounts = countVotes(socketGameVotes)
      setVoteCounts(newVoteCounts)
    }
  }, [cardRevealed, gameVotes])

  return (
    <div className={`${isCardRevealed ? "box-animation" : ""} w-96 min-h-[250px] h-full relative`}>

      <div className="w-full h-full flex items-center justify-center bg-gray-100 border-2 rounded-md">
        {!isCardRevealed ? (
          <CardsTobeVoted />
        ) : (

          <div className="flex items-center justify-center gap-5">

            {Object.keys(voteCounts).map((vote) => (

              <div key={vote} className="flex flex-col items-center custom-transition">

                <Card 
                  name={vote === "null" ? "nulo" : vote} 
                  nameSize={vote === "null" ? "text-sm" : 'text-xl'} 
                  isSelected={findWinningVotes().includes(vote)} 
                />

                <span className="text-xs">
                  {`${voteCounts[vote]} ${voteCounts[vote] > 1 ? 'votos' : 'voto'}`}
                </span>

              </div>

            ))}

          </div>
        )}
      </div>
    </div>
  )
}


