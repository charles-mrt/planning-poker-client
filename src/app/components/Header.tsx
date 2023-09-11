
import Image from 'next/image'
import logo from '/public/assets/logo.svg'
import { Dices, User } from 'lucide-react'

interface HeaderProps {
  playerName?: string
  gameName?: string
}

export const Header = ({ playerName, gameName }: HeaderProps) => {

  return (
    <header className="w-full max-h-16 bg-white p-2 flex items-start justify-between absolute left-0 top-0">

      <div>
        <Image src={logo} alt="logo planning poker" />

        {gameName &&
          <div className="flex items-center gap-1">
            <Dices size={16} strokeWidth={1} />
            <span className="cursor-pointer w-60 truncate ease-in duration-300 hover:text-clip hover:w-full">
              {`Nome do jogo: ${gameName}`}
            </span>
          </div>
        }

      </div>

      {playerName &&
        <span className="flex items-center gap-1">
          {playerName}
          <User size={16} strokeWidth={1} />
        </span>
      }

    </header>
  )
}
