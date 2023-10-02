import { useState } from 'react'
import { Card } from './Card'
import socket from '@/app/api/socket/auth'

interface CardsTobeVotedProps {
  cardSelected?: (cardName: string) => void
}

export const CardsTobeVoted = ({ cardSelected }: CardsTobeVotedProps) => {
  
  const cardNames = ['xxs', 'x', 's', 'm', 'l', 'xl', 'xxl', '?']
  const [selectedCard, setSelectedCard] = useState<string | null>(null)


  const handleCardClick = async (cardName: string) => {
    if (selectedCard !== "") setSelectedCard(cardName)
    if (cardSelected) cardSelected(cardName)

    const playerId = localStorage.getItem('player-id')
    const gameId = localStorage.getItem('game-id')
    const vote = cardName
  
    socket.emit('player-vote', { gameId, playerId, vote }, (game:any) => {})
   
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
