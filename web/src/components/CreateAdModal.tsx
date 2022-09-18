import { Input } from './Form/Input';
import { GameController, Check } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}


export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekdays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    axios('http://localhost:3000/games')
      .then(res => {
        setGames(res.data)
      })
  }, [])

  function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }
    try {
      axios.post(`http://localhost:3000/games/${data.game}/ads`, {
        "name": data.name,
        "yearsPlaying": Number(data.yearsPlaying),
        "discord": data.discord,
        "weekDays": data.weekDays,
        "hourStart": data.hourStart,
        "hourEnd": data.hourEnd,
        "useVoiceChannel": useVoiceChannel
      })

      alert('anuncio cadastrado com sucesso')
    } catch (err) {
      alert('erro ao criar anuncio')
      console.log(err)
    }

  }

  return (

    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/30">
        <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
        <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>

          <div className='flex flex-col gap-2'>
            <label htmlFor='game' className='font-semibold'> Qual o game?</label>
            <select
              name="game"
              id="game"
              className='bg-zinc-900 py-3 px-4 rounded placeholder:text-zinc-500'
              defaultValue=""
            >
              <option disabled value="">Selecione o game que deseja jogar</option>

              {games.map(game => {
                return <option key={game.id} value={game.id}>{game.title}</option>
              })}

            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="name" className='font-semibold'>Seu nome</label>
            <Input
              name="name"
              id="name"
              placeholder='Como de chamam dentro do game?'
            />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="yearsPlaying" className='font-semibold'>Joga há quantos anos?</label>
              <Input
                name="yearsPlaying"
                id="text"
                type='number'
                placeholder='Tudo bem ser ZERO'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="discord" className='font-semibold' >Qual seu Discord?</label>
              <Input
                name="discord"
                id='discord'
                type="text"
                placeholder='Usuario#0000'
              />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className='grid grid-cols-4 gap-1'
                value={weekDays}
                onValueChange={setWeekdays}>

                <ToggleGroup.Item
                  value='0'
                  title='Domingo'
                  className={`w-12 h-12 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='1'
                  title='Segunda'
                  className={`w-12 h-12 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='2'
                  title='Terça'
                  className={`w-12 h-12 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='3'
                  title='Quarta'
                  className={`w-12 h-12 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='4'
                  title='Quinta'
                  className={`w-12 h-12 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='5'
                  title='Sexta'
                  className={`w-12 h-12 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value='6'
                  title='Sábado'
                  className={`w-12 h-12 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className='flex flex-col gap-1'>
                <Input name="hourStart" id='hourStart' type='time' placeholder='De' />
                <Input name="hourEnd" id='hourEnd' type='time' placeholder='Até' />
              </div>
            </div>
          </div>

          <label className='mt-2 flex items-center gap-2 text-sm'>
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }}
              className="w-6 h-6 rounded bg-zinc-900">
              <Checkbox.Indicator>
                < Check className=" w-6 h-6 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className='mt-4 flex justify-end gap-4'>

            <Dialog.Close
              type='button'
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
              Cancelar
            </Dialog.Close>


            <button
              type='submit'
              className='bg-violet-500 flex rounded-md px-5 h-12 font-semibold items-center gap-3 hover:bg-violet-700 '>
              <GameController />
              Encontrar Duo
            </button>

          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}