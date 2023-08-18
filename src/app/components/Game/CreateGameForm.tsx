'use client'

import { Button } from '../Button'
import { UserCreationModal } from '../Users/UserCreationModal'
import { useCreateGame } from '../../hooks/useCreateGame'

export const CreateGameForm = () => {
  const { register, handleSubmit, errors, handleCreateGame, loginFormModal } = useCreateGame()

  return (
    <>
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

      {loginFormModal && <UserCreationModal />}
    </>
  )
}
