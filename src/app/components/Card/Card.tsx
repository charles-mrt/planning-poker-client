

interface CardProps {
  name?: string
  isSelected: boolean
  onCardClick?: () => void
}

export const Card = ({ name, isSelected, onCardClick }: CardProps) => {
  return (
    <div
      className={`${
        isSelected ? "bg-indigo-200" : "bg-transparent"
      } w-11 h-20 rounded-md border-2 border-indigo-600 text-indigo-600 flex items-center justify-center text-xl uppercase`}
      onClick={onCardClick}
    >
      {name}
    </div>
  )
}
