import { Button } from "../Button"

interface ConditionalButtonProps {
  cardRevealed: boolean
  handleCardRevealed: () => void
  handleEraseVote: () => void
}

export const ConditionalButton = ({ cardRevealed, handleCardRevealed, handleEraseVote }: ConditionalButtonProps) => {
  return (
    <div className="custom-transition">
      {!cardRevealed ?
        <Button
          name={"Revelar Carta"}
          onClickHandler={handleCardRevealed}
        />
        :
        <div className="custom-transition">
          <Button
            name={"Nova Votação?"}
            onClickHandler={handleEraseVote}
          />
        </div>
      }
    </div>
  )
}