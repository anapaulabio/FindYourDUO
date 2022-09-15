import './styles/main.css'

function App() {
  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col m-20">
      <img src="/logo-nlw-landing.png" alt="" />
      
      <h1 className="text-6xl text-white font-black m-20" >Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.</h1>

      <div className="grid grid-cols-6 gap-6 mt-4">
          <a className="relative rounded-lg" href="">
          <img src="/game-06.png" alt="" />

            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">League of Legends</strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
       
        </a>
        <a className="relative" href="">
          <img src="/game-01.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">Apex Legend</strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>
        <a className="relative" href="">
          <img src="game-02.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">Counter Strike</strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>
        <a className="relative" href="">
          <img src="game-03.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">World of Warcraft</strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>
        <a className="relative" href="">
          <img src="game-04.png" alt="" />
        
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">Dota 2</strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>
        <a className="relative" href="">
          <img src="game-05.png" alt="" />
        
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">Fortnite</strong>
            <span className="text-zinc-300 text-sm block">4 anúncios</span>
          </div>
        </a>
      </div>

      <div className="bg-[#2A2634] px-8 py-6 mt-8 self-stretch rounded-lg ">

      </div>

    </div>
  )

}

export default App
