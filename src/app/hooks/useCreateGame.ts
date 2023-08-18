import { useRouter } from 'next/navigation'
import api from '@/app/api/api'
import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useGetGameInfo } from './useGetGameInfo'

const createGameFormSchema = z.object({
  'game_name': z.string().max(60, "Máximo 60 caracteres")
})

type CreateGameFormData = z.infer<typeof createGameFormSchema>

export const useCreateGame = () => {

  const { handleGetGameInfo } = useGetGameInfo()
  const [loginFormModal, setLoginFormModal] = useState(false)
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
      const response = await api.post('/games', {
        name: formData.game_name
      })

      if (response.status === 201) {
        const gameId = response.data.id
        handleGameCreationSuccess(gameId)
      }

    } catch (error) {
      console.error("error sending data to backend", error)
    }
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
    loginFormModal
  }
}
