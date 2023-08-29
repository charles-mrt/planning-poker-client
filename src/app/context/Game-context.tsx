'use client'
import React, { ReactNode, createContext, useContext, useState } from 'react'

interface GameContextType {
  gameId: string | null
  gameName: string | null
  setGameId: (id: string | null) => void
  setGameName:(name:string | null) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function useGameContext() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider')
  }
  return context
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameId, setGameId] = useState<string | null>(null)
  const [gameName, setGameName] = useState<string | null>(null)
  return (
    <GameContext.Provider value={{ gameId, setGameId, gameName, setGameName}}>
      {children}
    </GameContext.Provider>
  )
}

