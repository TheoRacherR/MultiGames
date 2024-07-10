import React from 'react'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownItem,
  MenuMenu,
  Dropdown,
  Menu,
  DropdownDivider,
  // DropdownHeader,
  // Icon,
  // Segment,
} from 'semantic-ui-react'

const MenuDefault = () => {
  return (
    // <div className='bg-red-600 h-16'>
    //   MenuDefault
    // </div>
    <div>
      <Menu attached='top'>
        <MenuMenu position='right'>
          <Dropdown item icon='wrench' simple>
            <DropdownMenu>
              <Link to="/">
                <DropdownItem>Profile</DropdownItem>
              </Link>
              <DropdownDivider />
              <DropdownItem>Logout</DropdownItem>
              <DropdownItem>Login</DropdownItem>

              {/* <DropdownItem>
                <Icon name='dropdown' />
                <span className='text'>New</span>
                <DropdownMenu>
                  <DropdownItem>Document</DropdownItem>
                  <DropdownItem>Image</DropdownItem>
                </DropdownMenu>
              </DropdownItem> */}
              {/* <DropdownDivider />
              <DropdownHeader>Export</DropdownHeader>
              <DropdownItem>Share</DropdownItem> */}

            </DropdownMenu>
          </Dropdown>

        </MenuMenu>
      </Menu>
    </div>
  )
}

export default MenuDefault