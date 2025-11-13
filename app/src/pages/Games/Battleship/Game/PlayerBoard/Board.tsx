import React from 'react'
import { shipCase } from '../Battleship'

const Board = ({cases, style}: {cases: shipCase[], style: any}) => {
  return (
    <div id="board-panel" className='flex-[1 1 auto]' style={{flex: '1 1 auto'}}>
      <div id="board-title" className='flex items-center justify-between mb-[12px]'>
        <div className='font-[700] inline-block'>Ton plateau</div>
        <div id="legend" className='flex gap-[10px] items-center text-[#6B5BEA] font-[600] text-[13px]' aria-hidden="true">
          {[
            {title: "Navire", cl: "bg-[var(--color-primary-dark)]"},
            {title: "Touché", cl: "bg-[var(--color-battleship-hit)]"},
            {title: "Manqué", cl: "bg-[var(--color-text-muted)] border-[1px solid #CFCBFF]"}
          ].map((item, index) => (
            <span key={`title_legend_${item.title}`} className='flex items-center'><span className={`size-[14px] inline-block mr-[6px] rounded-[4px] ${item.cl}`}></span>{item.title}</span>
          ))}
        </div>
      </div>

      <div id="grid" className='w-[640px] p-[18px] rounded-[12px] border-[1px] border-[var(--color-border)] bg-[linear-gradient(180deg,var(--color-background), #FBF9FF)]'>
        {/* <div id="grid-axes" className="justify-between"> */}
          <div className='w-full flex gap-[8px] justify-between'>
            {['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((item, index) => (
              <span className='text-center font-[700] text-[var(--color-primary-dark)]' key={`grid_axes_${index}`} style={{width: 'calc((100% - 9*8px)/10)'}}>{item}</span>
            ))}
          {/* </div> */}
        </div>
        <div className="grid grid-cols-11 gap-[8px]" id="player-grid"  /* className="grid-inner" */ role="grid" aria-label="Grille du joueur">
          {cases.map((item, index) => (
            <>
              {index%10 === 0 ? 
                <div className='font-[700] relative bg-transparent rounded-[8px] overflow-hidden cursor-default align-middle text-center'>
                  <div className='m-auto'>{index / 10}</div>
                </div>
              :
                <></>
              }
              <div
                id={item.id.toString()}
                style={style}
                className='relative'
                key={index}
              >
                {item.bombed && item.hasShip ? //touché
                  <div className='absolute inset-[6px] rounded-[6px] duration-[.12s] ease-in bg-[#E53935] opacity-[1]'></div>
                  : item.bombed ? //raté
                    <div className='absolute inset-[6px] rounded-[6px] duration-[.12s] ease-in bg-[var(--color-surface)] opacity-[1] border-[1px] border-dashed border-[var(--color-border)]'></div>
                    : item.hasShip ? //bateau
                      <div className='absolute inset-[6px] rounded-[6px] duration-[.12s] ease-in bg-[var(--color-primary)] opacity-[1]' style={{boxShadow: '0 6px 14px rgba(108,78,246,0.18)'}}></div>
                    : 
                      <div className='absolute inset-[6px] rounded-[6px] duration-[.12s] ease-in opacity-[1]'></div>
                }
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Board