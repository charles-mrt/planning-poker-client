import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { createGame } from '../../services/game/create-game'
import { useGameContext } from '@/app/context/Game-context'
import { useRouter } from 'next/navigation'

interface GameDataProps {
  gameId: string
  gameName: string
}

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
    try {
      const gameId = await createGame(formData)

      if (!gameId) return setErrorMessage("Erro interno, tente novamente")

      handleGameCreationSuccess(gameId)

    } catch (error) {
      console.error("Erro ao criar o jogo:", error)
      setErrorMessage("Erro ao criar o jogo, tente novamente")
    }
  }

  const { setGameId, setGameName } = useGameContext()

  const handleGameCreationSuccess = async ({ gameId, gameName }: GameDataProps) => {

    const userName = localStorage.getItem('user-name')

    userName === null
      ? setLoginFormModal(true)
      : redirectToGame(gameId)

    setGameId(gameId)
    setGameName(gameName)
  }

  const redirectToGame = (gameId: string) => router.push(`/games/${gameId}`)

  return {
    register,
    handleSubmit,
    errors,
    handleCreateGame,
    loginFormModal,
    errorMessage
  }
}
