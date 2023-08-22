import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { createGame } from '../../services/game/create-game'
import { getLastGame } from '@/app/services/game/get-last-game'

const createGameFormSchema = z.object({
  'game_name': z.string().max(60, "Máximo 60 caracteres")
})

type CreateGameFormData = z.infer<typeof createGameFormSchema>

export const useCreateGame = () => {

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

    handleGameCreationSuccess()
  }

  const handleGameCreationSuccess = async () => {
    const userName = localStorage.getItem('user-name')

    userName === null
      ? setLoginFormModal(true)
      : redirectToGame()
  }

  const redirectToGame = async () => {
    const game = await getLastGame()
    router.push(`/games/${game?.id}`)
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
