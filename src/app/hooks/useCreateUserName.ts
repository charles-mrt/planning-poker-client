
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import api from '@/app/api/api'
import { useState } from 'react'

const createUserNameFormSchema = z.object({
  'user_name': z.string().min(2, "Mínimo 2 caracteres").max(10, "Máximo 10 caracteres")
})

type CreateUserNameFormData = z.infer<typeof createUserNameFormSchema>


export const useCreateUserName = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserNameFormData>({
    resolver: zodResolver(createUserNameFormSchema)
  })
  
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState('')
  

  const handleCreateUserName = async (formData: CreateUserNameFormData) => {
    
    try {
      const response = await api.post('/players', {
        name: formData.user_name
      })
      
      if (response.status === 201) {
        router.push('/games')
        localStorage.setItem("user-name", formData.user_name)
      }

    } catch (error) {
      console.error("error sending data to backend", error)
      setErrorMessage("Erro interno, tente novamente")
    }
  }
  return {
    register,
    handleSubmit,
    errors,
    handleCreateUserName,
    errorMessage
  }
}