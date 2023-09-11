import { useEffect, useState } from 'react'

const useDelayedReveal = (cardRevealed: boolean) => {
  const [isCardRevealed, setIsCardRevealed] = useState(false)

  useEffect(() => {
    if (cardRevealed) {
      const delay = setTimeout(() => {
        setIsCardRevealed(true)
      }, 3000)

      return () => clearTimeout(delay)
    } else {
      setIsCardRevealed(false)
    }
  }, [cardRevealed])

  return isCardRevealed
}

export default useDelayedReveal
