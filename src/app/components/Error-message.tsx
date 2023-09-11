import { AlertTriangle } from "lucide-react"

interface ErrorMessageProps {
  message: string
}
export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <span className="bg-red-400 p-6 text-white rounded-md flex items-center gap-2 max-w-[384px]">
      <AlertTriangle size={40} />
      <span className="text-center">{message}</span>
    </span>
  )
}