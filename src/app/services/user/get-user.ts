import api from '@/app/api/api'

interface UserProps {
  id: string
  name: string
}

export const getUser = async (): Promise<UserProps[]> => {
  try {
    const response = await api.get('/players')

    if (response.status === 200) {
      const user: UserProps[] = response.data               
      return user
    }
  } catch (error) {
    console.error('Error getting user:', error)
  }

  return []
}
