
import Image from 'next/image'
import logo from '/public/assets/logo.svg'

interface HeaderProps {
  userName?: string;
  gameName?: string;
}

export const Header = ({ userName, gameName }: HeaderProps) => {

  return (
    <header className="w-full max-h-16 bg-white p-2 flex items-start justify-between absolute left-0 top-0">
      <div>
        <Image src={logo} alt="logo planning poker"/>
        {gameName && <div>{`Nome do jogo: ${gameName}`}</div>}
      </div>
      <div>{userName}</div>
    </header>
  )
}
