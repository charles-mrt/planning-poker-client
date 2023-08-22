
import { Button } from '../Button'
import { useCreateUser } from '@/app/hooks/user/use-create-user'
import { ErrorMessage } from '../Error-message'

export const UserCreationModal = () => {

  const { register, handleSubmit, errors, handleCreateUserName, errorMessage } = useCreateUser()

  return (

    <div className="w-screen h-screen bg-zinc-900/70 absolute top-0 flex items-center justify-center">
      <div className="min-w-96 h-96 p-8 bg-white drop-shadow-lg rounded-md border-0 flex flex-col items-center justify-center gap-11">

        <div className="text-4xl text-gray-800">Escolha seu nome de usuário</div>

        <form onSubmit={handleSubmit(handleCreateUserName)} className="flex flex-col">

          <input
            className="w-96 border-2 rounded-md border-violet-700 py-4 px-6 text-gray-800 font-bold text-base focus:outline-none focus:border-violet-500"
            type="text"
            placeholder="Nome de usuário"
            {...register('user_name')}
          />

          {errors.user_name && <span className="text-red-500">{errors.user_name.message}</span>}

          <div className="mt-7">
            <Button name="Continuar para o jogo" />
          </div>

        </form>
        
        {errorMessage && <ErrorMessage message={errorMessage} />}

      </div>      
    </div>
  )
}