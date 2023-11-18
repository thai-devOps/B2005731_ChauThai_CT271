import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'

export default function PopUpModal() {
  const [openModal, setOpenModal] = useState<string | undefined>()
  const props = { openModal, setOpenModal }

  return (
    <>
      <Button  onClick={() => props.setOpenModal('pop-up')}>Xóa</Button>
      <Modal show={props.openModal === 'pop-up'} size='md' popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this product?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={() => props.setOpenModal(undefined)}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => props.setOpenModal(undefined)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
