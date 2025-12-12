const Board = ({playerBoard, children}: {playerBoard: boolean, children: JSX.Element}) => {
  return (
    <div className={`bg-[var(--color-primary)] p-2 rounded-2xl ${playerBoard ? 'rounded-tl-none' : 'rounded-tr-none'}`}>
      <div className='bg-[var(--color-surface)] w-[640px] p-[18px] rounded-[12px] border-[1px] border-[var(--color-border)] bg-[linear-gradient(180deg,var(--color-background), #FBF9FF)]'>
        
        <div className='w-full flex gap-[8px] justify-between'>
          {['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((item, index) => (
            <span className='text-center font-[700] text-[var(--color-primary-dark)] aspect-square' key={`grid_axes_${index}`} style={{width: 'calc((100% - 9*8px)/10)'}}>
              {item}
              </span>
          ))}
        </div>
        <div className="grid grid-cols-11 gap-[8px]" id="player-grid"  /* className="grid-inner" */ >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Board