import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GameBanner';
import { Input } from './components/Form/Input';

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
      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/30">
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

            <Dialog.Content>
              <form className='mt-8 flex flex-col gap-4'>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='game' className='font-semibold'> Qual o game?</label>
                  <Input
                    id="game"
                    placeholder='Selecione o game que deseja jogar'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="name" className='font-semibold'>Seu nome</label>
                  <Input
                    id="name"
                    placeholder='Como de chamam dentro do game?'
                  />
                </div>

                <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="yearsPlaying" className='font-semibold'>Joga há quantos anos?</label>
                    <Input
                      id="text"
                      type='number'
                      placeholder='Tudo bem ser ZERO'
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="discord" className='font-semibold' >Qual seu Discord?</label>
                    <Input
                      id='discord'
                      type="text"
                      placeholder='Usuario#0000'
                    />
                  </div>
                </div>

                <div className='flex gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="weekDays">Quando costuma jogar?</label>

                    <div className='grid grid-cols-4 gap-1'>
                      <button title='Domingo' className='w-12 h-12 rounded bg-zinc-900 hover:via-violet-500'> D </button>
                      <button title='Segunda' className='w-12 h-12 rounded bg-zinc-900 hover:via-violet-500'> S </button>
                      <button title='Terça' className='w-12 h-12 rounded bg-zinc-900 hover:via-violet-500'> T </button>
                      <button title='Quarta' className='w-12 h-12 rounded bg-zinc-900 hover:via-violet-500'> Q </button>
                      <button title='Quinta' className='w-12 h-12 rounded bg-zinc-900 hover:via-violet-500'> Q </button>
                      <button title='Sexta' className='w-12 h-12 rounded bg-zinc-900 hover:via-violet-500'> S </button>
                      <button title='Sábado' className='w-12 h-12 rounded bg-zinc-900 hover:via-violet-500'> S </button>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div className='flex flex-col gap-1'>
                      <Input id='hourStart' type='time' placeholder='De' />
                      <Input id='hourEnd' type='time' placeholder='Até' />
                    </div>
                  </div>
                </div>

                <div className='mt-2 flex gap-2 text-sm'>
                  <Input type='checkbox' />
                  Costumo me conectar ao chat de voz
                </div>

                <footer className='mt-4 flex justify-end gap-4'>
                  <button>
                    <Dialog.Close 
                    type='button'
                    className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                       Cancelar
                    </Dialog.Close>
                  </button >

                  <button 
                  type='submit'
                  className='bg-violet-500 flex rounded-md px-5 h-12 font-semibold items-center gap-3 hover:bg-violet-700 '>
                    <GameController />
                    Encontrar Duo
                  </button>

                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>


    </div>
  )

}

export default App
