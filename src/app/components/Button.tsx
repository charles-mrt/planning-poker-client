interface ButtonProps {
  name: string
  onClickHandler?: () => void
}

export const Button = ({ name, onClickHandler }: ButtonProps) => {
  return (
    <button
      onClick={onClickHandler}
      type="submit"
      className="w-96 bg-violet-700 rounded-md border-violet-700 py-4 px-6 text-white font-bold text-base text-center hover:bg-violet-800 transition-colors"
    >
      {name}
    </button>
  )
}