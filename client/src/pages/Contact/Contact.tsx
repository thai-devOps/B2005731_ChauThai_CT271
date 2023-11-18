const Contact = () => {
  return (
    <div className='container my-24 mx-auto md:px-6'>
      <section className='mb-32'>
        <div className='block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
          <div className='flex flex-wrap items-center'>
            <div className='block w-full shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12'>
              <div className='h-[500px] w-full'>
                <iframe
                  src='https://maps.google.com/maps?q=%C4%90%E1%BA%A1i%20H%E1%BB%8Dc%20C%E1%BA%A7n%20Th%C6%A1&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed'
                  className='left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg'
                  frameBorder={0}
                  allowFullScreen
                />
              </div>
            </div>
            <div className='w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12'>
              <div className='flex flex-wrap px-3 pt-12 pb-12 md:pb-0 lg:pt-0'>
                <div className='mb-12 w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:w-6/12 xl:px-12'>
                  <div className='flex items-start'>
                    <div className='shrink-0'>
                      <div className='inline-block rounded-md bg-primary-100 p-4 text-primary'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={2}
                          stroke='currentColor'
                          className='h-6 w-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z'
                          />
                        </svg>
                      </div>
                    </div>
                    <div className='ml-6 grow'>
                      <p className='mb-2 font-bold dark:text-white'>Số điện thoại Liên hệ</p>
                      <p className='text-neutral-500 dark:text-neutral-200'>+1 234-567-89</p>
                    </div>
                  </div>
                </div>
                <div className='mb-12 w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:w-6/12 xl:px-12'>
                  <div className='flex items-start'>
                    <div className='shrink-0'>
                      <div className='inline-block rounded-md bg-primary-100 p-4 text-primary'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={2}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            strokeLinecap='round'
                            d='M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25'
                          />
                        </svg>
                      </div>
                    </div>
                    <div className='ml-6 grow'>
                      <p className='mb-2 font-bold dark:text-white'>Email liên hệ</p>
                      <p className='text-neutral-500 dark:text-neutral-200'>thaib2005731@student.ctu.edu.vn</p>
                    </div>
                  </div>
                </div>
                <div className='mb-12 w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:mb-0 xl:w-6/12 xl:px-12'>
                  <div className='align-start flex'>
                    <div className='shrink-0'>
                      <div className='inline-block rounded-md bg-primary-100 p-4 text-primary'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={2}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                          />
                        </svg>
                      </div>
                    </div>
                    <div className='ml-6 grow'>
                      <p className='mb-2 font-bold dark:text-white'>Địa chỉ Liên Hệ</p>
                      <p className='text-neutral-500 dark:text-neutral-200'>Đường 3/2, Đại Học Cần Thơ, TP.Cần Thơ</p>
                    </div>
                  </div>
                </div>
                <div className='w-full shrink-0 grow-0 basis-auto px-3 md:w-6/12 md:px-6 lg:w-full xl:w-6/12 xl:px-12'>
                  <div className='align-start flex'>
                    <div className='shrink-0'>
                      <div className='inline-block rounded-md bg-primary-100 p-4 text-primary'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={2}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155'
                          />
                        </svg>
                      </div>
                    </div>
                    <div className='ml-6 grow'>
                      <p className='mb-2 font-bold dark:text-white'>Hổ trợ khách hàng</p>
                      <p className='text-neutral-500 dark:text-neutral-200'>assistant@example.com</p>
                      <p className='text-neutral-500 dark:text-neutral-200'>+1 234-567-89</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section: Design Block */}
    </div>
  )
}
export default Contact
