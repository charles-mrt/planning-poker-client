import { Card } from "./Card"
import { CardNames } from "./Card-names"

interface CardsVotedProps {
  cardRevealed: boolean
  voteCounts: { [vote: string]: number }
  cardValue: (cardName: string) => void
}

export const CardsVoted = ({ cardRevealed, voteCounts, cardValue }: CardsVotedProps) => {
    
  return (
    <div className="w-96 min-h-[250px] h-full flex items-center justify-center drop-shadow-xl bg-gray-100 border-2 rounded-md">

      {
        !cardRevealed ? (

         <CardNames cardSelected={cardValue} />

        ) : (

          <div className="flex items-center justify-center gap-5">
            
            {
              Object.keys(voteCounts).map((vote) => {

                return (
                  <div key={vote} className="flex flex-col items-center custom-transition">
                    <Card name={vote} isSelected={voteCounts[vote] > 1} />
                    <span className="text-xs">                      
                      {`${voteCounts[vote]} ${voteCounts[vote] > 1 ? 'votos' : 'voto'}`}
                    </span>
                  </div>
                )

              })}

          </div>
        )
      }

    </div>
  )
}
