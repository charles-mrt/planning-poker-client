import { useState } from 'react'
import { Card } from './Card'
import socket from '@/app/api/socket/auth'
import { useGetGameIdFromUrl } from '@/app/hooks/game/use-get-game-id-by-url'

export const CardsTobeVoted = () => {

  const cardNames = ['xxs', 'x', 's', 'm', 'l', 'xl', 'xxl', '?']
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const handleCardClick = async (cardName: string) => {
    if (selectedCard !== "") setSelectedCard(cardName)
  
    const playerId = localStorage.getItem('player-id')
    const gameId = useGetGameIdFromUrl()
    const vote = cardName
  
    socket.emit('player-vote', { gameId, playerId, vote }, () => {});
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
