import { categoryLine } from '../../../../../@types/atlas'

const Category = ({infos, clickable, click}: {infos: categoryLine, clickable: boolean, click: (categID: number) => void}) => {
  return (
    <div className={`
      flex justify-between px-5 py-2 my-2 rounded-[8px]
      bg-[var(--btn-secondary)] w-[500px] text-[var(--color-text-secondary)]
      ${clickable ? 'hover:bg-[var(--btn-secondary-hover)] cursor-pointer' : ''}
      shadow-md select-none
    `}
    onClick={() => clickable ? click(infos.categoryType.id) : {}}
    >

      <div className='flex justify-between'>
        <div className='mr-3'>{infos.categoryType.icon}</div>
        <div className='w-[200px] text-left'>{infos.categoryType.type}</div>
      </div>

      <div className='flex justify-between'>
        <div className='mr-3 w-[30px]'>{infos.countrySelected?.icon}</div>
        <div className='text-right w-[30px]'>{infos.rank >= 0 ? infos.rank === 101 ? '+100' : infos.rank : ''}</div>
      </div>

    </div>
  )
}

export default Category