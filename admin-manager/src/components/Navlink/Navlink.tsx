import classNames from 'classnames'
import React from 'react'
import { NavLink } from 'react-router-dom'
// Define props interface used
interface INavlinkProps {
  path: string
  children: React.ReactNode
}
const Navlink: React.FC<INavlinkProps> = ({ path, children }) => {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <li
          className={classNames({
            active: isActive,
            '': isActive
          })}
        >
          {children}
        </li>
      )}
    </NavLink>
  )
}
export default Navlink
