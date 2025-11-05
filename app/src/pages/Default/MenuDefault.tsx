import { errorWithUserOrLogout, getUserInfos } from '../../utils/Default/Auth'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Divider, IconButton, Menu, MenuItem } from '@mui/material'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { UserInfos } from '../../@types/user';

const links = [
  {
    name: 'Home',
    path: '/'
  },
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
  {
    name: 'Wordle',
    path: '/wordle'
  },
  {
    name: 'TimeGmae',
    path: '/timegame'
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

  const [userInfos, setUserInfos] = useState<UserInfos | null>(null);
  const navigate = useNavigate();

  const getLogInfos = async () => {
    try {
      const userInfo = await getUserInfos();
      console.log(userInfo);
      setUserInfos(userInfo);
    }
    catch (e) {
      console.log(e);
      // TODO Alerte d'erreur de récupération des infos du user
    }
  };

  useEffect(() => {
    getLogInfos();
  }, []);

  const handleLogout = () => {
    errorWithUserOrLogout();
    setUserInfos(null);
    // handleClose();
    // TODO Alerte de déconnexion
    return navigate('/');
  };

  const menuIcon = (): string => {
    switch (location.pathname) {
      case '/':
        return '🏠';
      case '/battleship':
        return '⛴️';
      case '/minesweeper':
        return '💣';
      case '/quiz':
        return '❓';
      case '/wordle':
        return '🟩';
      case '/timegame':
        return '⏳';
      default:
        return '';
    }
  }

  return (
    <menu className='flex justify-between h-[45px] bg-slate-900'>
        <div className='flex'>
          <div className='my-auto mx-5 text-xl text-white'>
            {menuIcon()}
          </div>
          {links.map((item, index) => (
            <Link to={item.path} key={index} className='my-auto mx-5 text-xl text-white'>
                {/* active={location.pathname === item.path} */}
                {item.name}
            </Link>
          ))}
        </div>

        {userInfos && userInfos.role === "admin" ? 'Admin' : <></>}
        <IconButton onClick={handleClick} sx={{color: 'white', textDecoration: 'none', textDecorationColor: 'white'}}>
          <PersonOutlineRoundedIcon fontSize='large' sx={{margin: 'auto'}}/>
        </IconButton>

        {userInfos ?
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
              return navigate('/account');
            }}>Mon compte</MenuItem>
            <MenuItem onClick={() => {
              handleClose();
              return navigate(`/user/${userInfos.id}`);
            }}>Mes informations</MenuItem>
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