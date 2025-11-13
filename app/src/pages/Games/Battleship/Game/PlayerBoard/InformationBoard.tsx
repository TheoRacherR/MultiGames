import React from 'react'

const InformationBoard = () => {
  return (
    <div className='w-[220px] flex flex-col gap-[12px]'>
      <div className='bg-[linear-gradient(180deg,#FFFFFF,#FBF9FF)] rounded-[12px] p-[12px] border-[1px] border-[var(--color-border)]'>
        <div className='font-[700] text-[var(--color-primary-dark)]'>Informations</div>
        <div className='mt-[8px] text-[13px] text-[#6B5BEA]'>
          - Vue : TON plateau uniquement<br/>
          - Position des navires visible pour toi<br/>
          - Clique "Placer aléatoire" pour positionner automatiquement<br/>
          - Clique "Jouer" pour commencer la partie
        </div>
      </div>

      <div className='bg-[linear-gradient(180deg,#FFFFFF,#FBF9FF)] rounded-[12px] p-[12px] border-[1px] border-[var(--color-border)] h-[120px]'>
        <div className='font-[700] text-[var(--color-primary-dark)]'>Légende</div>
        {[{title: 'Navire', color: 'var(--color-primary-dark)'}, {title: 'Touché', color: 'var(--color-battleship-hit)'}].map((item, index) => (
          <div key={`legend_side_${index}`} className='flex gap-[8px] items-center mt-[10px]'>
            <div className={`size-[14px] rounded-[4px] bg-[${item.color}]`}></div><div className='text-[13px] text-[#6B5BEA]'>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InformationBoard