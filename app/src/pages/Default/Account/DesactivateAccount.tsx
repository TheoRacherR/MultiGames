import { Button } from '@mui/material';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { UserInfos, userStatus } from '../../../@types/user';
import { red } from '@mui/material/colors';

const DesactivateAccount = ({userInfos, setUserInfos}: {userInfos: UserInfos, setUserInfos: React.Dispatch<React.SetStateAction<UserInfos>>}) => {
  // const navigate = useNavigate();
  const handleUpdateUserPassword = async () => {
    try {
      const res = await axios.patch(`/user/status/${userInfos.id}`, { status: userStatus.DESACTIVATE, userID: userInfos.id });
      console.log(res)
      if(res.status === 200) {
        // TODO Alerte infos mis à jour
        // res.data.message
      }
    } catch (e) {
      console.log(e);
      // TODO Alerte error
    }
  }
  return (
    <div className='mt-4'>
      <Button
        style={{ margin: "10px 0", width: "100%" }}
        sx={{ bgcolor: red[500] }}
        onClick={handleUpdateUserPassword}
        variant="contained"
        disabled={userInfos.status === userStatus.ACTIVE}
      >
        Desactivate account
      </Button>
    </div>
  )
}

export default DesactivateAccount