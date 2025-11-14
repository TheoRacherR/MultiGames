import React from 'react'

const Preview = ({link, alt}: { link?: string; alt: string}) => {
  return (
    <div className="p-4 bg-[var(--color-surface)] rounded-[12px] shadow-[0 8px 20px rgba(86,68,202,0.06)pap] flex flex-col items-center justify-center">
      <div
        className="w-full rounded-md bg-gradient-to-b from-[#F9F9FF] to-[#FBF9FF] flex justify-center"
      >
        {link ? 
          <img src={link} alt={alt} className="rounded-[8px]"/>
        :
          <div className="text-[#6C4EF6] font-extrabold text-2xl my-10">
            Preview Plateau
          </div>
        }
      </div>
      <div className="mt-3 text-sm text-[#6B5BEA]">
        Preview du jeu
      </div>
    </div>
  )
}

export default Preview