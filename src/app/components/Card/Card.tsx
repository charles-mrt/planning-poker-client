import { useGameContext } from "@/app/context/Game-context"

interface CardProps {
  name?: string
  isSelected: boolean
  onCardClick?: () => void
}

export const Card = ({ name, isSelected, onCardClick }: CardProps) => {
  const { isCardRevealed } = useGameContext()
  return (
    <div
      className={`${isSelected
        ? "bg-gradient-to-b from-cyan-500 to-blue-500 -translate-y-2 font-bold text-white"
        : "bg-transparent text-blue-600"
        } w-10 h-20 rounded-md border-2 border-blue-600  ease-in duration-150 flex items-center justify-center text-xl uppercase ${isCardRevealed ? 'cursor-wait' : 'cursor-pointer'} hover:bg-blue-300 hover:font-bold`}
      onClick={isCardRevealed ? undefined : onCardClick}
    >
      {name}
    </div>
  )
}

