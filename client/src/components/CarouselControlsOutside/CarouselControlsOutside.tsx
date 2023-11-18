import React, { useEffect } from 'react'
import Glide from '@glidejs/glide'
import { RoomType } from '~/types/room.type'
import { useQuery } from '@tanstack/react-query'
import { NavLink } from 'react-router-dom'
import { usePath } from '~/constants/usePath'
interface CarouselControlsOutsideProps {
  rooms: RoomType[]
}

const CarouselControlsOutside: React.FC<CarouselControlsOutsideProps> = ({ rooms }) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const slider = new Glide('.glide-04', {
      type: 'carousel',
      focusAt: 'center',
      perView: 3,
      autoplay: 3000,
      animationDuration: 700,
      gap: 24,
      classNames: {
        nav: {
          active: '[&>*]:bg-wuiSlate-700'
        }
      },
      breakpoints: {
        1024: {
          perView: 2
        },
        640: {
          perView: 1
        }
      }
    }).mount()

    return () => {
      slider.destroy()
    }
  }, [rooms])
  return (
    <>
      {/*<!-- Component: Carousel with controls outside --> */}
      <div className='glide-04 relative w-full'>
        {/*    <!-- Slides --> */}
        <div className='overflow-hidden' data-glide-el='track'>
          <ul className='whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0'>
            {rooms.map((room) => (
              <NavLink to={usePath.rooms + '/' + room._id}>
                <li key={room._id} className='w-96 h-64'>
                  <img src={room.images[0]} className='w-[382px] h-[256px] object-cover' alt={room.name} />
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
        {/*    <!-- Controls --> */}
        <div className='flex w-full items-center justify-center gap-2 p-4' data-glide-el='controls'>
          <button
            className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12'
            data-glide-dir='<'
            aria-label='prev slide'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-5 w-5'
            >
              <title>prev slide</title>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18' />
            </svg>
          </button>
          <button
            className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12'
            data-glide-dir='>'
            aria-label='next slide'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-5 w-5'
            >
              <title>next slide</title>
              <path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3' />
            </svg>
          </button>
        </div>
      </div>
      {/*<!-- End Carousel with controls outside --> */}
    </>
  )
}
export default CarouselControlsOutside
