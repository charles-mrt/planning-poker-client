'use client'
import { useState } from 'react'
import { Card } from './Card'

export const CardNames = () => {
  const cardNames = ['xxs', 'x', 's', 'm', 'l', 'xl', 'xxl', '?']
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const handleCardClick = (cardName: string) => {
    if (selectedCard !== "") setSelectedCard(cardName)
  }

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-5  cursor-pointer">
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
