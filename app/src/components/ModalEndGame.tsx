import CloseIcon from '@mui/icons-material/Close';

const ModalEndGame = ({title, content, buttons, closeModal}: {title: string, content: JSX.Element, buttons: JSX.Element, closeModal?: () => void}) => {
  return (
    <div className='z-40 fixed bg-[rgba(0,0,0,0.85)] top-0 left-0 w-full h-full text-center align-middle flex flex-col justify-center items-center text-[var(--color-text-secondary)]'>
      <div className='w-[900px] absolute z-50 bg-white mx-auto rounded-md text-left p-6'>
        <div className='flex justify-between'>
          <h2 className="pb-6 m-0 text-xl border-b-[1px] border-b-[rgba(34, 36, 38, 0.15)]">{title}</h2>
          <CloseIcon onClick={closeModal}/>
        </div>

        <div className="py-6 border-b-[1px] border-b-[rgba(34, 36, 38, 0.15)]">
          {content}
        </div>
        <div className="pt-6 flex flex-wrap-reverse justify-self-end gap-6">
          {buttons}
        </div>
      </div>
      {/* box-shadow: 1px 3px 3px 0 rgba(0, 0, 0, .2), 1px 3px 15px 2px rgba(0, 0, 0, .2); */}
    </div>
  )
}

export default ModalEndGame