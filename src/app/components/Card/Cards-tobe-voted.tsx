import { useState } from 'react'
import { Card } from './Card'
import { useAddPlayerVote } from '@/app/hooks/player/use-add-player-vote'

interface CardsTobeVotedProps {
  cardSelected?: (cardName: string) => void
}

export const CardsTobeVoted = ({ cardSelected }: CardsTobeVotedProps) => {
  const cardNames = ['xxs', 'x', 's', 'm', 'l', 'xl', 'xxl', '?']
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const handleCardClick = async (cardName: string) => {
    if (selectedCard !== "") setSelectedCard(cardName)
    if (cardSelected) cardSelected(cardName)
    setTimeout(() => {useAddPlayerVote()}, 1000)
  }

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-5 w-52" >
      {cardNames.map((cardName, index) => (
        <Card
          key={index}
          name={cardName}
          isSelected={selectedCard === cardName}
          onCardClick={() => handleCardClick(cardName)}
        />
      ))}
    </div>
  )
}
