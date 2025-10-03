import { verifyRole } from '../../utils/Default/Auth'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Divider, Menu, MenuItem } from '@mui/material'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

const links = [
  {
    name: 'Minesweeper',
    path: '/minesweeper'
  },
  {
    name: 'Battleship',
    path: '/battleship'
  },
  {
    name: 'Quiz',
    path: '/quiz'
  },
]

const MenuDefault = () => {
  const location = useLocation();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [logged, setLogged] = useState<boolean>(false);
  const [roleStr, setRoleStr] = useState("not logged");
  const navigate = useNavigate();

  const getLogInfos = async () => {
    try {
      const role = await verifyRole();
      setLogged(role !== "not logged");
      setRoleStr(role);
      console.log(role);
    }
    catch (e) {
      setLogged(false);
      setRoleStr("not logged");
      console.log(e);
      // TODO Alerte d'erreur de récupération des infos du user
    }
  };

  useEffect(() => {
    getLogInfos();
  }, []);

  const handleLogout = () => {
    localStorage.setItem("jwtToken", "");
    console.log("update jwt");
    setLogged(false);
    // handleClose();
    // TODO Alerte de déconnexion
    return navigate('/');
  };

  return (
    <menu className='flex justify-between h-[45px] bg-slate-900'>
        <div className='flex'>
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
          {links.map((item, index) => (
            <Link to={item.path} key={index} className='my-auto mx-5 text-xl text-white'>
                {/* active={location.pathname === item.path} */}
                {item.name}
            </Link>
          ))}
        </div>

        {roleStr === "admin" ? 'Admin' : <></>}
        <Button
          className='text-white no-underline decoration-white'
          onClick={handleClick}
        >
          <PersonOutlineRoundedIcon color='primary'/>
        </Button>
        {logged ?
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
              },
            }}
          >
            <MenuItem onClick={() => {
              handleClose();
              return navigate('/');
            }}>Mon compte</MenuItem>
            <Divider/>
            <MenuItem onClick={() => {
              handleClose();
              handleLogout();
              return;
            }}>Déconnexion</MenuItem>
          </Menu>
        :
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
              },
            }}
          >
            <MenuItem onClick={() => {
              handleClose();
              return navigate('auth');
            }}>Connnexion</MenuItem>
          </Menu>
        }
    </menu>
  )
}

export default MenuDefault