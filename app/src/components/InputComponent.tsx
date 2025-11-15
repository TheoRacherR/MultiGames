import React from 'react'

const InputComponent = ({change, children, cl}: {change: React.ChangeEventHandler<HTMLSelectElement>, children: JSX.Element, cl: string}) => {
  return (
    <span className={`flex h-[50px] w-[120px] py-1 px-3 bg-[var(--color-surface)] ${cl}`}>
      <select
        className="bg-[var(--color-surface)] pr-5 w-full h-full text-[var(--color-primary)]"
        onChange={(e) => change(e)}
      >
        {children}
      </select>
    </span>
  )
}

export default InputComponent