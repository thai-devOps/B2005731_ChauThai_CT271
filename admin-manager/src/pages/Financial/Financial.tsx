import { Tabs } from 'flowbite-react'
import React from 'react'
import { FaFileContract, FaFolderPlus } from 'react-icons/fa'
import { HiPencil, HiPencilAlt, HiUsers } from 'react-icons/hi'
import { MdDirectionsCar } from 'react-icons/md'
// Define props interface used
interface IFinancialProps {}
const Financial: React.FC<IFinancialProps> = (_props: IFinancialProps) => {
  return (
    <div>
      <div className='header bg-white p-5 rounded-md'>
        <div className='left'>
          <h1>Tài chính</h1>
        </div>
      </div>
      <div className='bg-white p-5 rounded-md mt-5'>
        <Tabs.Group aria-label='Full width tabs' style='fullWidth'>
          <Tabs.Item active icon={HiPencil} title='Ghi chỉ số'>
            <p>
              This is
              <span className='font-medium text-gray-800 dark:text-white'>Home tab's associated content</span>. Clicking
              another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
              control the content visibility and styling.
            </p>
          </Tabs.Item>
          <Tabs.Item icon={HiPencilAlt} title='Hoá đơn'>
            <p>
              This is
              <span className='font-medium text-gray-800 dark:text-white'>Dashboard tab's associated content</span>.
              Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes
              to control the content visibility and styling.
            </p>
          </Tabs.Item>
          <Tabs.Item icon={FaFolderPlus} title='Thu chi'>
            <p>
              This is
              <span className='font-medium text-gray-800 dark:text-white'>Settings tab's associated content</span>.
              Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes
              to control the content visibility and styling.
            </p>
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  )
}
export default Financial
