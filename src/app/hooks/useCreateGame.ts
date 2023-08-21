import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useGetGameInfo } from '../service/game/getGameInfo'
import { createGame } from '../service/game/createGame'

const createGameFormSchema = z.object({
  'game_name': z.string().max(60, "Máximo 60 caracteres")
})

type CreateGameFormData = z.infer<typeof createGameFormSchema>

export const useCreateGame = () => {
  const { handleGetGameInfo } = useGetGameInfo()
  const [loginFormModal, setLoginFormModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateGameFormData>({
    resolver: zodResolver(createGameFormSchema)
  })

  const handleCreateGame = async (formData: CreateGameFormData) => {
    const gameId = await createGame(formData);
    
    if (!gameId) return setErrorMessage("Erro interno, tente novamente")

    handleGameCreationSuccess(gameId)
  }

  const handleGameCreationSuccess = (gameId: string) => {
    if (localStorage.getItem('user-name') === null) {
      setLoginFormModal(true)
    } else {
      handleGetGameInfo(gameId)
      router.push('/games')
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    handleCreateGame,
    loginFormModal,
    errorMessage
  }
}
