import { useGameContext } from "@/app/context/Game-context"
import { Button } from "../Button"
import { useEffect, useState } from "react"
import socket from '@/app/api/socket/auth'

interface gameCardRevealButtonProps {
  handleCardRevealed: () => void
  handleEraseVote: () => void
}

export const GameCardRevealButton = ({ handleCardRevealed, handleEraseVote }: gameCardRevealButtonProps) => {
  const { isCardRevealed } = useGameContext()
  const [showCountdown, setShowCountdown] = useState(false)
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
   
    socket.on('reveal-game-votes', (value) => {
      if (value)  handleCardRevealed(); 
     
    });
    return () => {
      socket.off('reveal-game-votes');
    };
  }, [handleCardRevealed]);

  useEffect(() => {
    if (isCardRevealed) {
      setShowCountdown(true)
      setCountdown(3)
      socket.emit('reveal-game-votes', true)

      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)

      setTimeout(() => {
        clearInterval(interval)
        setShowCountdown(false)
      }, 4000)
    }
  }, [isCardRevealed])

  return (
    <div className="custom-transition">
      {!isCardRevealed ?
        <Button
          name={"Revelar Carta"}
          onClickHandler={handleCardRevealed}
        />
        :
        <div className="custom-transition">
          <Button
            hovering={showCountdown ? true : false}
            name={showCountdown ? `Aguarde ${countdown}...` : 'Nova Votação?'}
            onClickHandler={!showCountdown ? handleEraseVote : undefined}
          />
        </div>
      }
    </div>
  )
}

