
import { Button } from '../Button'
import { useCreateUser } from '@/app/hooks/user/use-create-user'
import { ErrorMessage } from '../Error-message'
import { useGameContext } from '@/app/context/Game-context'
import { useState } from 'react'


interface GameDataFormModal {
  urlGameId?: string
  isActived?: boolean
  onUserCreated?: (onCloseModal: () => void) => void
}

export const UserCreationModal = ({ urlGameId, isActived, onUserCreated }: GameDataFormModal) => {

  const [isActiveModal, setIsActiveModal] = useState(isActived ?? true)

  const handleCloseModal = () => {
    setIsActiveModal(false)
  }

  const { handleSubmit, handleCreateUserName, register, errors, errorMessage } = useCreateUser()
  const { gameId: contextGameId } = useGameContext()
  const gameId = contextGameId ?? urlGameId

  const handleFormSubmitData = async (formData: { user_name: string }) => {
    await handleCreateUserName(formData, gameId ?? '')

    if (onUserCreated) { onUserCreated(handleCloseModal) }
  }
  return (

    <div className="w-screen h-screen bg-zinc-900/70 absolute z-50 top-0 flex items-center justify-center">
      <div className="min-w-96 h-96 p-8 bg-white drop-shadow-lg rounded-md border-0 flex flex-col items-center justify-center gap-11">

        <div className="text-4xl text-gray-800">Escolha seu nome de usuário</div>

        <form onSubmit={handleSubmit(handleFormSubmitData)} className="flex flex-col">

          <input
            className="w-96 border-2 rounded-md border-violet-700 py-4 px-6 text-gray-800 font-bold text-base focus:outline-none focus:border-violet-500"
            type="text"
            placeholder="Nome de usuário"
            {...register('user_name')}
          />

          {errors.user_name && <span className="text-red-500">{errors.user_name.message}</span>}
          <div className="mt-7">

            <Button
              name="Continuar para o jogo"
              onClickHandler={() => { handleCloseModal() }}
            />

          </div>

        </form>

        {errorMessage && <ErrorMessage message={errorMessage} />}

      </div>
    </div>

  )
}