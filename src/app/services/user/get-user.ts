import api from '@/app/api/api'

interface UserProps {
  id: string
  name: string
  vote?: string | null
}

export const getUser = async (gameId:string): Promise<UserProps[]> => {

  try {
    const response = await api.get(`games/${gameId}/players`)

    if (response.status === 200) {
      const user: UserProps[] = response.data               
      return user
    }
  } catch (error) {
    console.error('Error getting user:', error)
  }

  return []
}
