import { categoryLine } from '../../../../../@types/atlas'
import React from 'react'

const Category = ({infos, clickable, click}: {infos: categoryLine, clickable: boolean, click: (categID: number) => void}) => {
  return (
    <div className={`
      flex justify-between px-5 py-2 my-2 rounded-[8px]
      bg-[var(--btn-secondary)] w-[300px] text-[var(--color-text-secondary)]
      ${clickable ? 'hover:bg-[var(--btn-secondary-hover)] cursor-pointer' : ''}
      shadow-md select-none
    `}
    onClick={() => clickable ? click(infos.category.id) : {}}
    >
      <div>{infos.category.icon}</div>
      <div className='text-left'>{infos.category.type}</div>
      <div>{infos.rank >= 0 ? infos.rank === 101 ? '+100' : infos.rank : ''}</div>
    </div>
  )
}

export default Category