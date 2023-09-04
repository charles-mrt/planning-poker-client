
'use client'
import React, { useEffect, useState } from 'react'

import { Header } from '@/app/components/Header'
import { ErrorMessage } from '@/app/components/Error-message'
import { UserCreationModal } from '@/app/components/Users/User-creation-modal'
import { GameNotFound } from '@/app/components/Game/Game-not-found'
import { ConditionalButton } from '@/app/components/Game/Conditional-button'
import { PlayersVotedCard } from '@/app/components/Card/Players-voted-card'
import { CardsVoted } from '@/app/components/Card/Cards-voted'

import { useGameContext } from '@/app/context/Game-context'

import { useGetGameById } from '@/app/hooks/game/use-get-game-by-id'
import { handleUserVote } from '@/app/hooks/user/use-create-user-vote'

interface Player {
  name: string
  vote: string
}

export default function Game() {

  const [voteCounts, setVoteCounts] = useState<{ [vote: string]: number }>({})
  const [loginFormModal, setLoginFormModal] = useState(false)
  const [isCardSelected, setIsCardSelected] = useState(false)
  const [isCardRevealed, setIsCardRevealed] = useState(false)
  const [cardValue, setIscardValue] = useState("")

  const { gameId: gameIdFromContext } = useGameContext()
  const userName = localStorage.getItem('user-name')

  const getGameIdFromUrl = () => {
    const pathnameArray = window.location.pathname.split('/')
    const gameIdIndex = pathnameArray.indexOf('games') + 1
    return pathnameArray[gameIdIndex]
  }
  const gameIdFromUrl = getGameIdFromUrl()

  const {
    gameId,
    gameName,
    gameUrl,
    gamePlayers,
    isLoading,
    isError,
  } = useGetGameById({ gameId: gameIdFromContext ?? gameIdFromUrl })

  const showModal = () => {
    if (userName === null) setLoginFormModal(true)
  }

  const handleCardRevealed = () => {
    setIsCardRevealed(true)
    handleUserVote()
    cardsVoted()
  }

  const getCardValue = (value: string) => {
    setIscardValue(value)
    setIsCardSelected(true)
  }

  const updateUserVote = () => {
    if (cardValue !== "") localStorage.setItem('user-vote', cardValue)
  }

  const eraseVote = () => {
    setIsCardRevealed(false)
    setIsCardSelected(false)
    setIscardValue("")
    localStorage.setItem('user-vote', "")
  }

  const cardsVoted = () => {
    const newVoteCounts: { [vote: string]: number } = {}
    gamePlayers?.forEach((player: Player) => {
      if (newVoteCounts[player.vote]) {
        newVoteCounts[player.vote]++
      } else {
        newVoteCounts[player.vote] = 1
      }
    })
    setVoteCounts(newVoteCounts)
  }

  useEffect(() => {
    showModal()
    updateUserVote()

  }, [isCardSelected, cardValue])


  if (isError)
    return (
      <div className="h-full flex items-center">
        <ErrorMessage message='Ocorreu um erro ao carregar os dados. Tente novamente' />
      </div>
    )

  if (!gameId) return <GameNotFound />

  return (
    <div className="w-full h-full">
      <Header userName={userName ?? ""} gameName={gameName} />

      <main className="h-full w-full flex flex-col items-center justify-center">

        {isLoading ? (

          <p>Carregando o jogo...</p>

        ) : (

          <>

            {loginFormModal && (
              <UserCreationModal
                urlGameId={getGameIdFromUrl()}
                onUserCreated={() => setLoginFormModal(false)}
              />
            )}

            <div className="flex flex-col items-center">
              <div className="h-32 flex items-center">
                <h1 className="text-4xl text-gray-800">
                  {!isCardSelected ? "Selecione suas cartas!" : ""}
                </h1>

                {isCardSelected && (
                  <ConditionalButton
                    cardRevealed={isCardRevealed}
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
                          cardRevealed={isCardRevealed}
                          playerVote={gamePlayer.vote}
                          playerName={gamePlayer.name}
                        />
                      </li>
                    )
                  })
                }
              </ul>

              <CardsVoted
                cardRevealed={isCardRevealed}
                voteCounts={voteCounts}
                cardValue={getCardValue}
              />

            </div>

          </>
        )}

      </main>

    </div>
  )
}

