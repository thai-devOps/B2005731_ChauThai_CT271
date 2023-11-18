import React from 'react'
const SlideSection: React.FunctionComponent = () => {
  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 '>
        <div className='mx-auto max-w-screen-sm text-center mb-3 lg:mb-5'>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-teal-900 dark:text-white'>
            Phản hồi và Đánh giá
          </h2>
          <p className='font-normal text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400'>
            Sự phản hồi chân thành, nhận xét chi tiết góp phần xây dựng một phòng trọ đáng sống và hoàn hảo hơn cho
            khách hàng.
          </p>
        </div>
        <div className='grid gap-8 grid-col-1 mb-6 lg:mb-16'>
          <div id='default-carousel' className='relative w-full' data-carousel='slide'>
            {/* Carousel wrapper */}
            <div className='relative h-56 overflow-hidden rounded-lg md:h-96'>
              {/* Item 1 */}
              <div className='hidden duration-700 ease-in-out' data-carousel-item>
                <section className='bg-white absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 dark:bg-gray-900'>
                  <div className='max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6'>
                    <figure className='max-w-screen-md mx-auto'>
                      <svg
                        className='h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600'
                        viewBox='0 0 24 27'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z'
                          fill='currentColor'
                        />
                      </svg>
                      <blockquote>
                        <p className='text-2xl font-medium text-gray-900 dark:text-white'>
                          "Phòng trọ sạch sẽ, thoải mái và có vị trí thuận tiện. Chủ nhà thân thiện và nhiệt tình hỗ
                          trợ. Chỉ cần cải thiện một số tiện nghi như hệ thống điều hòa và dịch vụ giặt ủi. Tôi hài lòng
                          với trải nghiệm ở đây."
                        </p>
                      </blockquote>
                      <figcaption className='flex items-center justify-center mt-6 space-x-3'>
                        <img
                          className='w-6 h-6 rounded-full'
                          src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png'
                          alt='profile picture'
                        />
                        <div className='flex items-center'>
                          <div className='pr-3 font-medium text-gray-900 dark:text-white'>Micheal Gough</div>
                          <div className='flex items-center space-x-2'>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-gray-300 dark:text-gray-500'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </section>
              </div>
              <div className='hidden duration-700 ease-in-out' data-carousel-item>
                <section className='bg-white absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 dark:bg-gray-900'>
                  <div className='max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6'>
                    <figure className='max-w-screen-md mx-auto'>
                      <svg
                        className='h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600'
                        viewBox='0 0 24 27'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z'
                          fill='currentColor'
                        />
                      </svg>
                      <blockquote>
                        <p className='text-2xl font-medium text-gray-900 dark:text-white'>
                          "Phòng trọ có giá phải chăng và sạch sẽ, nhưng không có wifi và điều hòa. Cần cải thiện thêm
                          về tiện nghi."
                        </p>
                      </blockquote>
                      <figcaption className='flex items-center justify-center mt-6 space-x-3'>
                        <img className='w-6 h-6 rounded-full' src='img/img-2.jpg' alt='profile picture' />
                        <div className='flex items-center'>
                          <div className='pr-3 font-medium text-gray-900 dark:text-white'>Blanche Pearson</div>
                          <div className='flex items-center space-x-2'>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-gray-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-gray-300 dark:text-gray-500'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </section>
              </div>
              <div className='hidden duration-700 ease-in-out' data-carousel-item>
                <section className='bg-white absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 dark:bg-gray-900'>
                  <div className='max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6'>
                    <figure className='max-w-screen-md mx-auto'>
                      <svg
                        className='h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600'
                        viewBox='0 0 24 27'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z'
                          fill='currentColor'
                        />
                      </svg>
                      <blockquote>
                        <p className='text-2xl font-medium text-gray-900 dark:text-white'>
                          " Phòng trọ tuyệt vời! Sạch sẽ, thoải mái và có tất cả tiện nghi cần thiết. Chủ nhà thân thiện
                          và dễ tính."
                        </p>
                      </blockquote>
                      <figcaption className='flex items-center justify-center mt-6 space-x-3'>
                        <img className='w-6 h-6 rounded-full' src='img/img-3.jpg' alt='profile picture' />
                        <div className='flex items-center'>
                          <div className='pr-3 font-medium text-gray-900 dark:text-white'>Joenas Brauers</div>
                          <div className='flex items-center space-x-2'>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </section>
              </div>
              <div className='hidden duration-700 ease-in-out' data-carousel-item>
                <section className='bg-white absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 dark:bg-gray-900'>
                  <div className='max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6'>
                    <figure className='max-w-screen-md mx-auto'>
                      <svg
                        className='h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600'
                        viewBox='0 0 24 27'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z'
                          fill='currentColor'
                        />
                      </svg>
                      <blockquote>
                        <p className='text-2xl font-medium text-gray-900 dark:text-white'>
                          " Phòng trọ ấm cúng, có view đẹp và an ninh tốt. Chỉ cần thêm tiện ích như phòng gym sẽ hoàn
                          hảo."
                        </p>
                      </blockquote>
                      <figcaption className='flex items-center justify-center mt-6 space-x-3'>
                        <img className='w-6 h-6 rounded-full' src='img/img-4.jpg' alt='profile picture' />
                        <div className='flex items-center'>
                          <div className='pr-3 font-medium text-gray-900 dark:text-white'>Lariach French</div>
                          <div className='flex items-center space-x-2'>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-gray-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </section>
              </div>
              <div className='hidden duration-700 ease-in-out' data-carousel-item>
                <section className='bg-white absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 dark:bg-gray-900'>
                  <div className='max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6'>
                    <figure className='max-w-screen-md mx-auto'>
                      <svg
                        className='h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600'
                        viewBox='0 0 24 27'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z'
                          fill='currentColor'
                        />
                      </svg>
                      <blockquote>
                        <p className='text-2xl font-medium text-gray-900 dark:text-white'>
                          " Phòng trọ rộng rãi và thoải mái, nhưng vị trí hơi xa khỏi trung tâm thành phố. Chủ nhà thân
                          thiện nhưng phản hồi chậm. Cần cải thiện vấn đề này để đảm bảo dịch vụ tốt hơn."
                        </p>
                      </blockquote>
                      <figcaption className='flex items-center justify-center mt-6 space-x-3'>
                        <img className='w-6 h-6 rounded-full' src='img/img-5.jpg' alt='profile picture' />
                        <div className='flex items-center'>
                          <div className='pr-3 font-medium text-gray-900 dark:text-white'>James Khosravi</div>
                          <div className='flex items-center space-x-2'>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-yellow-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-gray-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                            <svg
                              className='w-4 h-4 text-gray-300'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='currentColor'
                              viewBox='0 0 22 20'
                            >
                              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                            </svg>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default SlideSection
