import Link from "next/link"

interface ButtonLinkProps {
  url: string
  text: string
}

export const Buttonlink = ({ url, text }: ButtonLinkProps) => {
  return (
    <Link href={url} className="w-96 bg-violet-700 rounded-md border-violet-700 py-4 px-6 text-white font-bold text-base text-center hover:bg-violet-800 transition-colors">
      {text}
    </Link>
  )
}