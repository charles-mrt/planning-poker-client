import api from '@/app/api/api'

interface UserProps {
  user_name: string
}

export const createUser = async (formData: UserProps) => {
  try {
    const response = await api.post('/players', {
      name: formData.user_name
    })

    if (response.status === 201) return true
  
  } catch (error) {
    console.error("error sending data to backend", error)
    throw new Error("Erro interno, tente novamente")
  }
}
