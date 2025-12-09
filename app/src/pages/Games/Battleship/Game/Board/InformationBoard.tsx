import { legendList } from "assets/Battleship/Board";
import { informationList } from "assets/Battleship/Informations"

const InformationBoard = () => {
  return (
    <div className='w-[220px] flex flex-col gap-[12px]'>
      <ContainerInfos title={'Informations'}>
        <ul className='mt-[8px] text-[13px] text-[#6B5BEA]'>
          {informationList.map((item, index) => (
            <li key={`info_${index}`}>- {item}</li>
          ))}
        </ul>
      </ContainerInfos>

      <ContainerInfos title={'Légende'}>
        <>
          {legendList.map((item, index) => (
            <div key={`legend_side_${index}`} className='flex gap-[8px] items-center mt-[10px]'>
              <div className={`size-[14px] rounded-[4px] ${item.color}`}></div>
              <div className='text-[13px] text-[#6B5BEA]'>{item.title}</div>
            </div>
          ))}
        </>
      </ContainerInfos>

      {/* TODO: height: -moz-available; height: -webkit-fill-available;  */}
      <ContainerInfos title={'Logs'} cLname={'flex-auto'}> 
        <div className="h-full">
          <p className='text-[13px] text-[#6B5BEA]'>test</p>
        </div>
      </ContainerInfos>
    </div>
  )
}

export default InformationBoard;

const ContainerInfos = ({title, children, cLname}: {title: string, children: JSX.Element; cLname?: string}) => {
  return (
    <div className={`${cLname ? cLname : ''} bg-[linear-gradient(180deg,#FFFFFF,#FBF9FF)] rounded-[12px] p-[12px] border-[1px] border-[var(--color-border)]`}>
      <div className='font-[700] text-[var(--color-primary-dark)]'>{title}</div>
      {children}
    </div>
  )
}