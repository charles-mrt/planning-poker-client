
import Image from 'next/image'
import logo from '/public/assets/logo.svg'
import {Dices, User} from 'lucide-react'
interface HeaderProps {
  userName?: string | null;
  gameName?: string;
}

export const Header = ({ userName, gameName }: HeaderProps) => {

  return (
    <header className="w-full max-h-16 bg-white p-2 flex items-start justify-between absolute left-0 top-0">
      
      <div>
        <Image src={logo} alt="logo planning poker"/>
        
        <div className="flex items-center gap-1">
          <Dices size={16} strokeWidth={1} />
        {gameName && <span>{`Nome do jogo: ${gameName}`}</span>}
        </div>
        
      </div>

      <div className="flex items-center gap-1">        
        {userName}
        <User size={16} strokeWidth={1} />
      </div>

    </header>
  )
}
