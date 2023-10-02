import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useGameContext } from '@/app/context/Game-context'
import { useState } from 'react'
import { addPlayer } from '@/app/services/player/add-player'

const MAX_LENGTH = 15
const MIN_LENGTH = 2
const addplayerNameFormSchema = z.object({
  'player_name': z.string().min(MIN_LENGTH, `Mínimo ${MIN_LENGTH} caracteres`).max(MAX_LENGTH, `Máximo ${MAX_LENGTH} caracteres`)
})

type AddPlayerNameFormData = z.infer<typeof addplayerNameFormSchema>

export const useAddPlayer = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const { gameId } = useGameContext()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AddPlayerNameFormData>({
    resolver: zodResolver(addplayerNameFormSchema)
  })

  const handleAddPlayerName = async (formData: AddPlayerNameFormData, urlGameId: string) => {

    const response = await addPlayer({
      player_name: formData.player_name,
      gameId: gameId ?? urlGameId
    })

    if (!response?.success) return setErrorMessage("Erro interno, tente novamente")



    localStorage.setItem('player-name', formData.player_name)
    localStorage.setItem('player-id', response.playerId)

    const playerVote = response.playerVote ?? ""
    localStorage.setItem('player-vote', playerVote)

    await redirectToGame()
  }

  const redirectToGame = async () => {
    if (gameId !== null) router.push(`/games/${gameId}`)
  }


  return {
    register,
    handleSubmit,
    errors,
    handleAddPlayerName,
    errorMessage
  }
}
