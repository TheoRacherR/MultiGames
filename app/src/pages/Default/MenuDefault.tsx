import { errorWithUserOrLogout, getUserInfos } from 'utils/Default/Auth'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Divider, IconButton, Menu, MenuItem } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import { UserInfos } from '../../@types/user';
import logo from 'assets/logo_medium_white.png';

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
    switch (location.pathname.split('/')[1].toLowerCase()) {
      case '':
        return 'home';
      case 'battleship'.toLowerCase():
        return 'battleship';
      case 'minesweeper'.toLowerCase():
        return 'minesweeper';
      case 'quiz'.toLowerCase():
        return 'quiz';
      case 'wordle'.toLowerCase():
        return 'wordle';
      case 'timegame'.toLowerCase():
        return 'Timegame';
      default:
        return '';
    }
  }

  return (
    <menu className={`flex justify-between h-[45px] bg-[--color-primary] text-[--color-text-primary]`} style={{color: 'var(--color-text-primary)'}}>
        <div className='my-auto mx-5 text-xl flex gap-2'>
          <img src={logo} alt="logo" className='w-4 h-4 m-auto cursor-pointer' onClick={() => {return navigate('/')}}/>
          <div className='font-bold my-auto text-xl'>
            <Link to={`/${menuIcon() === 'home'.toLowerCase() ? '' : menuIcon()}`}>{menuIcon().toUpperCase()}</Link>
          </div>
        </div>

        <div className='flex gap-2'>
          <div className='font-bold my-auto text-xl'>
            <Link to={'/contact'}>{'Contact'.toUpperCase()}</Link>
          </div>

          {userInfos && userInfos.role === "admin" ? 'Admin' : <></>}
          <IconButton onClick={handleClick} sx={{color: 'white', textDecoration: 'none', textDecorationColor: 'white'}}>
            <PersonIcon fontSize='small' sx={{margin: 'auto'}}/>
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

        </div>
    </menu>
  )
}

export default MenuDefault