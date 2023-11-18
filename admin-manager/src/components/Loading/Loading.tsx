import React from 'react'
// Define props interface used
interface ILoadingProps {
  isLoading: boolean
}
const Loading: React.FC<ILoadingProps> = ({ isLoading }) => {
  return (
    isLoading && (
      <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-[10000] overflow-hidden bg-gray-700 opacity-80 flex flex-col items-center justify-center'>
        <div className='custom_loader_page'></div>
        <h2 className='text-center text-white text-xl font-semibold mt-10'>Đang tải...</h2>
      </div>
    )
  )
}
export default Loading
