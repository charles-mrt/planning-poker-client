interface CardProps {
  name?: string
  isSelected: boolean
  onCardClick?: () => void
}

export const Card = ({ name, isSelected, onCardClick }: CardProps) => {
  return (
    <div
      className={`${isSelected 
        ? "bg-gradient-to-b from-cyan-500 to-blue-500 -translate-y-2 font-bold text-white" 
        : "bg-transparent text-blue-600"
        } w-10 h-20 rounded-md border-2 border-blue-600  ease-in duration-150 flex items-center justify-center text-xl uppercase cursor-pointer hover:bg-blue-300 hover:font-bold`}
      onClick={onCardClick}
    >
      {name}
    </div>
  )
}

