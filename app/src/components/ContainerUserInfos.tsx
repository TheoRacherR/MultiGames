import React from 'react'

const ContainerUserInfos = ({children}: {children: JSX.Element}) => {
  return (
    <div className="p-10 mx-auto w-[600px]">
      {children}
    </div>
  )
}

export default ContainerUserInfos