
interface HeaderPros {
  userName: string;
  gameName: string;
}

export const Header = ({ userName, gameName }: HeaderPros) => {
  return (
    <header className="w-full bg-white p-2 display flex items-start justify-between">
      <div>
        <div>logo aqui</div>
        <div>{gameName && `Nome do jogo: ${gameName}`}</div>
      </div>
      <div>{userName}</div>
    </header>
  )
}