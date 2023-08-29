
'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import card from '/public/assets/card-cover.png'

import { CardNames } from '@/app/components/Card/Card-names'
import { Header } from '@/app/components/Header'
import { Buttonlink } from '@/app/components/ButtonLink'
import { ErrorMessage } from '@/app/components/Error-message'
import { UserCreationModal } from '@/app/components/Users/User-creation-modal'
import { Button } from '@/app/components/Button'

import { useGameContext } from '@/app/context/Game-context'
import { useGetGameById } from '@/app/hooks/game/use-get-game-by-id'


interface Player {
  name: string
}

export default function Game() {

  const [loginFormModal, setLoginFormModal] = useState(false)
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

  const showModal = () => { if (userName === null) setLoginFormModal(true) }


  const [isCardSelected, setIsCardSelected] = useState(false)

  const handleCardClick = () => {
    setIsCardSelected(true)
  }


  useEffect(() => {
    showModal()
  }, [isCardSelected])


  if (isError) return (<><ErrorMessage message='Ocorreu um erro ao carregar os dados' /></>)

  return (
    <div className="w-full h-full">
      <Header userName={userName ?? ""} gameName={gameName} />

      <main className="h-full w-full flex flex-col items-center justify-center gap-11">

        {isLoading ? (
          <>
            <ErrorMessage message='Erro. Jogo não existe!' />
            <Buttonlink url='/create-game' text='Iniciar um jogo?' />
          </>

        ) : (

          <>{loginFormModal && (
            <UserCreationModal
              urlGameId={getGameIdFromUrl()}
              onUserCreated={() => setLoginFormModal(false)}
            />
          )}

            {gameId ? (
              <div className="flex flex-col items-center">
                <h1 className="text-4xl text-gray-800 mb-10">Selecione suas cartas!</h1>

                {isCardSelected && (
                  <div>
                    <Button name='Revelar Carta' />


                    <ul className="m-5 flex items-start justify-around">

                      {gamePlayers?.map((player: Player, index: number) => {
                        return (
                          <li key={index} className='flex flex-col items-center mx-2'>

                            <div className=" w-10 h-16 rounded-md border-2 bg-gray-100 border-violet-700">
                              <Image src={card} alt="card" className="object-scale-down w-full h-full" />
                            </div>

                            <span className="whitespace-pre-line w-10 text-xs text-center capitalize">
                              {player.name}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
                <CardNames cardSelected={handleCardClick} />

              </div>
            ) : (
              <p>Carregando o jogo...</p>
            )}
          </>

        )}

      </main>

    </div>
  )
}

