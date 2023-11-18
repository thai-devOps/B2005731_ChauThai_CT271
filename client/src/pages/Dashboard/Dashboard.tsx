import React from 'react'
// Define props interface used
interface IDashboardProps {}
const Dashboard: React.FC<IDashboardProps> = (_props: IDashboardProps) => {
  return (
    <div>
      <div className='header'>
        <div className='left'>
          <h1>Trang chủ</h1>
        </div>
        {/* <a href='#' className='report'>
              <i className='bx bx-cloud-download' />
              <span>Download CSV</span>
            </a> */}
      </div>
      {/* Insights */}
      <ul className='insights'>
        <li>
          <i className='bx bx-table'></i>
          <span className='info'>
            <h3>1,074</h3>
            <p>Phòng</p>
          </span>
        </li>
        <li>
          <i className='bx bx-show-alt' />
          <span className='info'>
            <h3>3,944</h3>
            <p>Khách</p>
          </span>
        </li>
        <li>
          <i className='bx bx-line-chart' />
          <span className='info'>
            <h3>14,721</h3>
            <p>Searches</p>
          </span>
        </li>
        <li>
          <i className='bx bx-dollar-circle' />
          <span className='info'>
            <h3>$6,742</h3>
            <p>Doanh thu</p>
          </span>
        </li>
      </ul>
      {/* End of Insights */}
      <div className='bottom-data'>
        <div className='orders'>
          <div className='header'>
            <i className='bx bx-receipt' />
            <h3>Đặt cọc gần đây</h3>
            <i className='bx bx-filter' />
            <i className='bx bx-search' />
          </div>
          <table>
            <thead>
              <tr>
                <th>Khách</th>
                <th>Ngày đặt cọc</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>John Doe</p>
                </td>
                <td>14-08-2023</td>
                <td>
                  <span className='status completed'>Hoàn thành</span>
                </td>
              </tr>
              <tr>
                <td>
                  <p>John Doe</p>
                </td>
                <td>14-08-2023</td>
                <td>
                  <span className='status pending'>Tạm hoãn</span>
                </td>
              </tr>
              <tr>
                <td>
                  <p>John Doe</p>
                </td>
                <td>14-08-2023</td>
                <td>
                  <span className='status process'>Đang xử lý</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Reminders */}
        <div className='reminders'>
          <div className='header'>
            <i className='bx bx-note' />
            <h3>Lời nhắc nhở</h3>
            <i className='bx bx-filter' />
            <i className='bx bx-plus' />
          </div>
          <ul className='task-list'>
            <li className='completed'>
              <div className='task-title'>
                <i className='bx bx-check-circle' />
                <p>Start Our Meeting</p>
              </div>
              <i className='bx bx-dots-vertical-rounded' />
            </li>
            <li className='completed'>
              <div className='task-title'>
                <i className='bx bx-check-circle' />
                <p>Analyse Our Site</p>
              </div>
              <i className='bx bx-dots-vertical-rounded' />
            </li>
            <li className='not-completed'>
              <div className='task-title'>
                <i className='bx bx-x-circle' />
                <p>Play Footbal</p>
              </div>
              <i className='bx bx-dots-vertical-rounded' />
            </li>
          </ul>
        </div>
        {/* End of Reminders*/}
      </div>
    </div>
  )
}
export default Dashboard
