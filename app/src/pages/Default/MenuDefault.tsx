import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownItem,
  MenuMenu,
  Dropdown,
  Menu,
  DropdownDivider,
  MenuItem,
} from 'semantic-ui-react'

const links = [
  {
    name: 'Minesweeper',
    path: '/minesweeper'
  },
  {
    name: 'Battleship',
    path: '/battleship'
  },
]

const MenuDefault = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className='menu'>
      <Menu attached='top'  color='black' size='large' inverted>
        <MenuMenu position='left'>
          <div className='my-auto mx-5 text-xl text-white'>
            {
              location.pathname === '/' ?
                'Home'
              :
                location.pathname.startsWith('/battleship') ?
                  '⛴️'
                :
                  location.pathname.startsWith('/minesweeper') ?
                    '💣'
                    :
                      ''
              // `${location.pathname.substring(1,2).toUpperCase()}${location.pathname.substring(2,location.pathname.length)}`
            }
          </div>
        </MenuMenu>

        {links.map((item, index) => (
          <Link to={item.path} key={index}>
            <MenuItem
              name={item.name}
              active={location.pathname === item.path}
              // onClick={this.handleItemClick}
            />
          </Link>
        ))}

        <MenuMenu position='right'>
          <Dropdown item icon='user' simple>
            <DropdownMenu>
              {/* <Link to="/" style={{color: 'black'}}> */}
              <DropdownItem onClick={() => { return navigate('/') }}>Mon compte</DropdownItem>
              {/* </Link> */}
              <DropdownDivider />
              <DropdownItem>Déconnexion</DropdownItem>
              <DropdownItem>Connnexion</DropdownItem>

            </DropdownMenu>
          </Dropdown>

        </MenuMenu>
      </Menu>
    </div>
  )
}

export default MenuDefault