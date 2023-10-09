
'use client'
import React, { useEffect, useState } from 'react'

import { Header } from '@/app/components/Header'
import { AddPlayerModal } from '@/app/components/Players/Add-player-modal'
import { GameNotFound } from '@/app/components/Game/Game-not-found'
import { GameCardRevealButton } from '@/app/components/Game/Game-card-reveal-button'
import { PlayersVotedCard } from '@/app/components/Card/Players-voted-card'
import { CardsContaniner } from '@/app/components/Card/Cards-container'
import { Spinner } from '@/app/components/Spinner'

import { useGameContext } from '@/app/context/Game-context'
import { useGetGameById } from '@/app/hooks/game/use-get-game-by-id'

import socket from '@/app/api/socket/auth'
import { autoRegisterPlayerNameIfStored } from '@/app/hooks/player/auto-register-player-name-if-stored'
import { Confettis } from '@/app/components/Confettis'
import { useGetGameIdFromUrl } from '@/app/hooks/game/use-get-game-id-by-url'


interface Player {
  name: string
  vote: string
}

type GameDataProps = {
  gameId: string
  gameName: string
  gameUrl: string
  gamePlayers: Player[]
  gameVotes: string[]
}

export default function Game() {

  const [loginFormModal, setLoginFormModal] = useState(false)
  const [isCardSelected, setIsCardSelected] = useState(false)
  const [playersData, setPlayersData] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [gameData, setGameData] = useState<GameDataProps>({
    gameId: '',
    gameName: '',
    gameUrl: '',
    gamePlayers: [],
    gameVotes: [],
  })

  const { gameId: gameIdFromContext, isCardRevealed, setIsCardRevealed } = useGameContext()

  const playerNameFromStorage = localStorage.getItem('player-name')
  const playerIdFromStorage = localStorage.getItem('player-id')
  const gameIdFromUrl = useGetGameIdFromUrl()


  async function fetchData() {
    const data = await useGetGameById({ gameId: gameIdFromContext ?? gameIdFromUrl }) as GameDataProps
    if (data) {
      setGameData({
        ...data
      })
    }
  }

  const showRegisterPlayerNameModal = () => {
    if (playerNameFromStorage === null) {
      setLoginFormModal(true)
    } else {
      autoRegisterPlayerNameIfStored({
        playerNameFromStorage,
        playerIdFromStorage,
        gameIdFromUrl: gameIdFromContext ?? gameIdFromUrl
      })
    }
  }

  const handleCardRevealed = () => { setIsCardRevealed(true) }

  const eraseVote = () => { socket.emit('clean-votes', gameData.gameId) }
 

  socket.on('update-game', async (gameId, isClean) => {
    if (!isClean) {
      setIsCardRevealed(false)
      setIsCardSelected(false)
    }
  })
 
  const emitPlayerJoin = (gameId: string, playerName: string,) => {
    socket.emit('enter-game-board', gameId, playerName)
    setIsLoading(true)
    socket.on('update-game', (game) => {

      if (game && game.players) {
        const playerData: [] = game.players.map((player: Player) => ({
          name: player.name,
          vote: player.vote,
        }))
        playerData.forEach((player: Player) => {
          if (player.vote !== null) {
            setIsCardSelected(true)
          }
        })
        setPlayersData(playerData)
        setIsLoading(false)
      }
    })
  }

  useEffect(() => {
    if (playerNameFromStorage) {
      emitPlayerJoin(gameIdFromContext ?? gameIdFromUrl, playerNameFromStorage)
    }
  }, [playerNameFromStorage])

  useEffect(() => {
    showRegisterPlayerNameModal()

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    fetchData()
  }, [])


  return (
    <> {isLoading ? (

      <Spinner />

    ) : (

      <>
        {!gameData.gameId ? (

          <GameNotFound gameId={gameIdFromUrl} />

        ) : (

          <div className="w-full h-full">
            <Header playerName={playerNameFromStorage ?? ""} gameName={gameData.gameName} />

            <main className="h-full w-full flex flex-col items-center justify-center">

              {loginFormModal && (
                <AddPlayerModal
                  urlGameId={gameIdFromUrl}
                  onPlayerAdded={() => setLoginFormModal(false)}
                />
              )}

              <div className="flex flex-col items-center relative">
                <div className="h-32 flex items-center">

                  {!isCardSelected ? (

                    <h1 className="text-4xl text-gray-800">
                      Selecione suas cartas!
                    </h1>

                  ) : (

                    <GameCardRevealButton
                      handleCardRevealed={handleCardRevealed}
                      handleEraseVote={eraseVote}
                      gameId={gameIdFromUrl}
                    />

                  )}

                </div>

                <ul className="my-4 flex items-start justify-around">
                  {
                    playersData?.map((player, index: number) => {
                      return (
                        <li key={index} className='flex flex-col items-center mx-2'>
                          <PlayersVotedCard
                            cardRevealed={isCardRevealed ?? false}
                            playerVote={!isCardSelected ? player.vote = "" : player.vote}
                            playerName={player.name}
                          />
                        </li>
                      )
                    })
                  }
                </ul>

                <CardsContaniner
                  cardRevealed={isCardRevealed ?? false}
                  gameVotes={gameData.gameVotes ?? []}
                />

              </div>

            </main>
            {isCardRevealed ? <Confettis /> : <></>}
          </div>
        )}
      </>

    )}
    </>
  )
}
