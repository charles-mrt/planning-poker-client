import api from '@/app/api/api'

interface UserProps {
  user_name: string
  gameId:string
}

export const createUser = async (formData: UserProps) => {
  try {
    const response = await api.post(`games/${formData.gameId}/players`, {      
      name: formData.user_name
    })
    if (response.status === 201) return true
  
  } catch (error) {
    console.error("error sending data to backend", error)
    throw new Error("(create user) Erro interno, tente novamente")
  }
}
