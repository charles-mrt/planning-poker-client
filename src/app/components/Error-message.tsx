import { AlertTriangle } from "lucide-react"

interface ErrorMessageProps {
  message: string
}
export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <span className="bg-red-400 p-6 text-white rounded-md flex gap-1">
      <AlertTriangle />
      {message}
    </span>
  )
}