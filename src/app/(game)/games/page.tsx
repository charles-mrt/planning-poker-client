'use client'
import React, { useEffect, useState } from 'react';
import { CardNames } from '@/app/components/Card/CardNames';
import { Header } from '@/app/components/Header';
import api from '@/app/api/api';
import { useRouter } from 'next/navigation';

export default function Game() {
  const router = useRouter();
  const [lastGameName, setLastGameName] = useState<string>("");
  const userName = localStorage.getItem("user-name");
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (userName === null) {
      router.push('/')
      return
    }

    const fetchLastGameName = async () => {
      try {
        const response = await api.get(`/games`)
        const gamesArray = response.data;

        if (gamesArray.length > 0) {
          const lastGame = gamesArray[gamesArray.length - 1]
          setLastGameName(lastGame.name)
        }
      } catch (error) {
        console.error("Erro ao obter o nome do último jogo:", error)
      }
      
      setShouldRender(true)
    }
    fetchLastGameName()
  }, [router, userName])

  if (!shouldRender) {
    return null
  }

  return (
    <div className="w-full h-full">
      <Header userName={userName} gameName={lastGameName} />

      <main className="h-full w-full flex flex-col items-center justify-center gap-11">
        <h1 className="text-4xl text-gray-800">Selecione suas cartas!</h1>
        <CardNames />
      </main>
    </div>
  );
}
