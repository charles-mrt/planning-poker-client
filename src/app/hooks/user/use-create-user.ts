import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useGameContext } from '@/app/context/Game-context'
import { useState } from 'react'
import { createUser } from '@/app/services/user/create-user'

const createUserNameFormSchema = z.object({
  'user_name': z.string().min(2, "Mínimo 2 caracteres").max(15, "Máximo 15 caracteres")
})

type CreateUserNameFormData = z.infer<typeof createUserNameFormSchema>

export const useCreateUser = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const { gameId } = useGameContext()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserNameFormData>({
    resolver: zodResolver(createUserNameFormSchema)
  })

  const handleCreateUserName = async (formData: CreateUserNameFormData, urlGameId: string) => {

    const response = await createUser({
      user_name: formData.user_name,
      gameId: gameId ?? urlGameId
    })

    if (!response?.success) return setErrorMessage("Erro interno, tente novamente")

    localStorage.setItem('user-name', response.userName)
    localStorage.setItem('user-id', response.userId)
    localStorage.setItem('user-vote', response.userVote)
    
    await redirectToGame()
  }

  const redirectToGame = async () => {
    if (gameId !== null) router.push(`/games/${gameId}`)
  }


  return {
    register,
    handleSubmit,
    errors,
    handleCreateUserName,
    errorMessage
  }
}
