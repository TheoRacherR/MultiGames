
const LineAtoJ = ({index}: {index: number}) => {
  return (
    <>
      {index%10 === 0 ? 
        <div className='font-[700] relative bg-transparent rounded-[8px] overflow-hidden cursor-default align-middle text-center flex'>
          <div className='m-auto'>{index / 10}</div>
        </div>
      :
        <></>
      }
    </>
  )
}

export default LineAtoJ