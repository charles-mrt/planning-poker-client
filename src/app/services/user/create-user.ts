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
    
    if (response.status === 201) {
      const userId = response.data.id
      const userName = response.data.name
      const userVote = response.data.vote
      return { success: true, userId, userName, userVote }
    }

  } catch (error) {
    console.error("error sending data to backend", error)
    throw new Error("Erro interno, tente novamente")
  }
}
