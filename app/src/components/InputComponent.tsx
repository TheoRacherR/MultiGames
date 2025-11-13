import React from 'react'

const InputComponent = ({change, children, cl}: {change: React.ChangeEventHandler<HTMLSelectElement>, children: JSX.Element, cl: string}) => {
  return (
    <span className={`flex h-[50px] w-[100px] py-1 px-3 bg-slate-200 ${cl}`}>
      <select
        className="bg-slate-200 pr-5 w-full h-full"
        onChange={(e) => change(e)}
      >
        {children}
      </select>
    </span>
  )
}

export default InputComponent