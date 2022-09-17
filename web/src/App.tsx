import { useEffect, useState } from 'react';

import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GameBanner';
import './styles/main.css'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}
function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/games')
      .then(res => res.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col m-20">
      <img src="/logo-nlw-landing.png" alt="" />

      <h1 className="text-6xl text-white font-black m-20" >Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.</h1>

      <div className="grid grid-cols-6 gap-6 mt-4">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads} />
          )
        })}

      </div>
      <CreateAdBanner />

    </div>
  )

}

export default App
