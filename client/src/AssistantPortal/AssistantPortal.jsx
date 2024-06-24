import React from 'react'
import Sidebar from './Components/Sidebar'
import Topbar from './Components/Topbar'

export default function AssistantPortal() {
  return (
    <div className='w-full flex '>
      <Sidebar />
      <div className='w-full h-screen flex flex-col '>
        <Topbar />
      </div>

    </div>
  )
}
