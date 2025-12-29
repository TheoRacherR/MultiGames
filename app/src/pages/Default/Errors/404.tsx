import { buttonComponentColor, buttonComponentSize, buttonComponentType } from '../../../@types/default';
import ButtonComponent from 'components/ButtonComponent';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className='w-screen h-screen bg-[var(--color-primary)]'>
      <div className='pt-[200px] text-[120px] font-bold text-center text-[var(--color-text-primary)]'>
        404, can't find this page
      </div>
      <div className='flex justify-center mt-10'>
        <ButtonComponent
          text={'Back home'}
          color={buttonComponentColor.PRIMARY}
          size={buttonComponentSize.LARGE}
          type={buttonComponentType.OUTLINE}
          clickOn={() => navigate('/')}
        />
      </div>
    </div>
  )
}

export default Page404;