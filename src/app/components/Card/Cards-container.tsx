import React, { useState, useEffect } from "react"

import { Card } from "./Card"
import { CardsTobeVoted } from "./Cards-tobe-voted"
import useDelayedReveal from "./hook/useDelayedReveal"

interface CardsVotedProps {
  cardRevealed: boolean
  cardValue: (cardName: string) => void
  gameVotes: (string | null)[]
}

export const CardsContaniner = ({ cardRevealed, cardValue, gameVotes }: CardsVotedProps) => {

  const [voteCounts, setVoteCounts] = useState<{ [vote: string]: number }>({})
  const isCardRevealed = useDelayedReveal(cardRevealed)

  
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
      const newVoteCounts = countVotes(gameVotes)
      setVoteCounts(newVoteCounts)
    }
  }, [cardRevealed, gameVotes])

  return (
    <div className="w-96 min-h-[250px] h-full flex items-center justify-center drop-shadow-xl bg-gray-100 border-2 rounded-md">

      {!isCardRevealed ? (

        <CardsTobeVoted cardSelected={cardValue} />

      ) : (

        <div className="flex items-center justify-center gap-5">

          {Object.keys(voteCounts).map((vote) => (

            <div key={vote} className="flex flex-col items-center custom-transition">

              <Card name={vote} isSelected={findWinningVotes().includes(vote)} />

              <span className="text-xs">
                {`${voteCounts[vote]} ${voteCounts[vote] > 1 ? 'votos' : 'voto'}`}
              </span>

            </div>

          ))}

        </div>
      )}
    </div>
  )
}


