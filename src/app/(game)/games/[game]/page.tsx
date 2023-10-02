
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
import { addPlayerVote } from '@/app/services/player/add-player-vote'
import socket from '@/app/api/socket/auth'
import { autoRegisterPlayerNameIfStored } from '@/app/hooks/player/auto-register-player-name-if-stored'


interface Player {
  name: string
  vote: string
}

export default function Game() {

  const [loginFormModal, setLoginFormModal] = useState(false)
  const [isCardSelected, setIsCardSelected] = useState(false)
  const [cardValue, setIscardValue] = useState("")

  const [gameData, setGameData] = useState({
    gameId: '',
    gameName: '',
    gameUrl: '',
    gamePlayers: [],
    gameVotes: [],
  })

  const { gameId: gameIdFromContext, isCardRevealed, setIsCardRevealed } = useGameContext()

  const playerNameFromStorage: string = localStorage.getItem('player-name') as string



  const getGameIdFromUrl = () => {
    const pathnameArray = window.location.pathname.split('/')
    const gameIdIndex = pathnameArray.indexOf('games') + 1
    return pathnameArray[gameIdIndex]
  }
  const gameIdFromUrl = getGameIdFromUrl()

  async function fetchData() {
    const data = await useGetGameById({ gameId: gameIdFromContext ?? gameIdFromUrl });
    if (data) {
      setGameData(data)
    }
  }

  const playerIdFromStorage: string = localStorage.getItem('player-id') as string


  const gameId = gameData.gameId
  const gameVotes = gameData.gameVotes
  const gamePlayers = gameData.gamePlayers
  const gameName = gameData.gameName

  localStorage.setItem('game-id', gameId)

  const showRegisterPlayerNameModal = () => {
    if (playerNameFromStorage === null) {
      setLoginFormModal(true)
    } else {
      autoRegisterPlayerNameIfStored({
        playerNameFromStorage,
        playerIdFromStorage,
        gameIdFromUrl,
      })
    }
  }

  const handleCardRevealed = () => {
    setIsCardRevealed(true)
  }
  const getCardValue = (value: string) => {
    setIscardValue(value)
    setIsCardSelected(true)
  }

  const updatePlayerVote = () => {
    if (cardValue !== "") localStorage.setItem('player-vote', cardValue)
  }

  const eraseVote = () => { socket.emit('start-new-votation', true) }

  socket.on('start-new-votation', (value) => {
    if (value) {
      addPlayerVote({ gameId, playerId: playerIdFromStorage, vote: null })
      setIsCardRevealed(false)
      setIsCardSelected(false)
      setIscardValue("")
      localStorage.setItem('player-vote', "")
    }
  });


  const [playersData, setPlayersData] = useState<Player[]>([]);

  const emitPlayerJoin = (gameId: string, playerName: string,) => {
    socket.emit('enter-game-board', gameId, playerName);

    socket.on('update-game', (game) => {
      if (game && game.players) {
        const playerData = game.players.map(player => ({
          name: player.name,
          vote: player.vote,
        }));
        playerData.forEach(player => {
          if (player.vote !== null) {
            setIsCardSelected(true)
          }
        })
        setPlayersData(playerData);
      }
    });

  }


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    showRegisterPlayerNameModal();
    if (playerNameFromStorage) {
      emitPlayerJoin(gameIdFromContext ?? gameIdFromUrl, playerNameFromStorage);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);


  useEffect(() => {
    updatePlayerVote();
    fetchData();
  }, [isCardSelected, cardValue]);


  return (
    <> {isLoading ? (

      <Spinner />

    ) : (

      <>
        {!gameId ? (

          <GameNotFound gameId={gameIdFromUrl} />

        ) : (

          <div className="w-full h-full">
            <Header playerName={playerNameFromStorage ?? ""} gameName={gameName} />

            <main className="h-full w-full flex flex-col items-center justify-center">

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
                    playersData?.map((player, index: number) => {
                      return (
                        <li key={index} className='flex flex-col items-center mx-2'>
                          <PlayersVotedCard
                            cardRevealed={isCardRevealed ?? false}
                            playerVote={!isCardSelected ? player.vote = "" : player.vote}
                            playerName={!isCardSelected ? player.name = "" : player.vote}
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


            </main>

          </div>
        )}
      </>
    )} </>
  )
}
