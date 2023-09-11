
'use client'
import React, { useEffect, useState } from 'react'

import { Header } from '@/app/components/Header'
import { ErrorMessage } from '@/app/components/Error-message'
import { AddPlayerModal } from '@/app/components/Players/Add-player-modal'
import { GameNotFound } from '@/app/components/Game/Game-not-found'
import { GameCardRevealButton } from '@/app/components/Game/Game-card-reveal-button'
import { PlayersVotedCard } from '@/app/components/Card/Players-voted-card'
import { CardsContaniner } from '@/app/components/Card/Cards-container'

import { useGameContext } from '@/app/context/Game-context'
import { useGetGameById } from '@/app/hooks/game/use-get-game-by-id'
import { addPlayerVote } from '@/app/services/player/add-player-vote'

interface Player {
  name: string
  vote: string
}

export default function Game() {

  const [loginFormModal, setLoginFormModal] = useState(false)
  const [isCardSelected, setIsCardSelected] = useState(false)
  const [cardValue, setIscardValue] = useState("")

  const { gameId: gameIdFromContext, isCardRevealed, setIsCardRevealed } = useGameContext()

  const playerName: string | null = localStorage.getItem('player-name')

  const getGameIdFromUrl = () => {
    const pathnameArray = window.location.pathname.split('/')
    const gameIdIndex = pathnameArray.indexOf('games') + 1
    return pathnameArray[gameIdIndex]
  }
  const gameIdFromUrl = getGameIdFromUrl()

  const {
    gameId,
    gameName,
    gamePlayers,
    isLoading,
    isError,
    gameVotes,
    isValidating
  } = useGetGameById({ gameId: gameIdFromContext ?? gameIdFromUrl })

  localStorage.setItem('game-id', gameId)

  const showModal = () => {
    if (playerName === null) setLoginFormModal(true)
  }

  const handleCardRevealed = () => {
    if (!isValidating) setIsCardRevealed(true)
  }


  const getCardValue = (value: string) => {
    setIscardValue(value)
    setIsCardSelected(true)
  }

  const updatePlayerVote = () => {
    if (cardValue !== "") localStorage.setItem('player-vote', cardValue)
  }

  const eraseVote = () => {
    setIsCardRevealed(false)
    setIsCardSelected(false)
    setIscardValue("")
    localStorage.setItem('player-vote', "")
    const playerIdFromStorage: string = localStorage.getItem('player-id') as string
    addPlayerVote({ gameId, playerId: playerIdFromStorage, vote: "" })
  }

  useEffect(() => {
    showModal()
    updatePlayerVote()

  }, [isCardSelected, cardValue])


  if (isError)
    return (
      <div className="h-full flex items-center">
        <ErrorMessage message='Ocorreu um erro ao carregar os dados. Tente novamente' />
      </div>
    )

  if (!gameId) return <GameNotFound gameId={gameIdFromUrl} />

  return (
    <div className="w-full h-full">
      <Header playerName={playerName ?? ""} gameName={gameName} />

      <main className="h-full w-full flex flex-col items-center justify-center">

        {isLoading ? (

          <p>Carregando o jogo...</p>

        ) : (

          <>

            {loginFormModal && (
              <AddPlayerModal
                urlGameId={getGameIdFromUrl()}
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
                  />

                )}

              </div>

              <ul className="my-4 flex items-start justify-around">
                {
                  gamePlayers?.map((gamePlayer: Player, index: number) => {
                    return (
                      <li key={index} className='flex flex-col items-center mx-2'>
                        <PlayersVotedCard
                          cardRevealed={isCardRevealed ?? false}
                          playerVote={gamePlayer.vote}
                          playerName={gamePlayer.name}
                        />
                      </li>
                    )
                  })
                }
              </ul>

              <CardsContaniner
                cardRevealed={isCardRevealed ?? false}
                cardValue={getCardValue}
                gameVotes={gameVotes ?? []}
              />

            </div>
          </>
        )}

      </main>

    </div>
  )
}
