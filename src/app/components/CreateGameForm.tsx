'use client'

import { useRouter } from 'next/navigation'
import { Button } from './Button'
import api from '../api/api'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createGameFormSchema = z.object({
  'game_name': z.string().max(60, "Máximo 60 caracteres")
})

type CreateGameFormData = z.infer<typeof createGameFormSchema>

export const CreateGameForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateGameFormData>({
    resolver: zodResolver(createGameFormSchema)
  })

  const router = useRouter()

  const handleCreateGame = async (formData: CreateGameFormData) => {
    try {
      const response = await api.post('/games', {
        name: formData.game_name
      })
      
      if (response.status === 201) router.push('/games')
      
    } catch (error) {
      console.error("error sending data to backend", error)
    }

  }

  return (
    <form onSubmit={handleSubmit(handleCreateGame)} className="flex flex-col">

      <label className="text-xs text-gray-800">nome do jogo</label>

      <input
        className="w-96 border-2 rounded-md border-violet-700 py-4 px-6 text-gray-800 font-bold text-base focus:outline-none focus:border-violet-500"
        type="text"
        placeholder="Nome do jogo"
        {...register('game_name')}
      />
      
      {errors.game_name && <span className="text-red-500">{errors.game_name.message}</span>}

      <div className="mt-7">
        <Button name="Criar jogo" />
      </div>
    </form>
  )
}
