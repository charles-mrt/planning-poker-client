import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { createUser } from '@/app/services/user/create-user'
import { getLastGame } from '@/app/services/game/get-last-game'

const createUserNameFormSchema = z.object({
  'user_name': z.string().min(2, "Mínimo 2 caracteres").max(10, "Máximo 10 caracteres")
})

type CreateUserNameFormData = z.infer<typeof createUserNameFormSchema>

export const useCreateUser = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserNameFormData>({
    resolver: zodResolver(createUserNameFormSchema)
  })

  const handleCreateUserName = async (formData: CreateUserNameFormData) => {
    const success = await createUser(formData)

    if (!success) return setErrorMessage("Erro interno, tente novamente")

    await redirectToGame(formData.user_name)
  }

  const redirectToGame = async (userName: string) => {
    const game = await getLastGame()
      router.push(`/games/${game?.id}`)
      localStorage.setItem("user-name", userName)
  }

  return {
    register,
    handleSubmit,
    errors,
    handleCreateUserName,
    errorMessage
  }
}
