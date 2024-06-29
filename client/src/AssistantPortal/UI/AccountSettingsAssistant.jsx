import React from 'react'
import Sidebar from '../Components/Sidebar'
import Topbar from '../Components/Topbar'
import AccountSettings from '../../components/AccountSettings'

export default function AccountSettingsAssistant() {
  return (
    <div className='w-full flex '>
            <Sidebar />
            <div className='w-full h-screen flex flex-col '>
                <Topbar/>
                <AccountSettings/>
            </div>
        </div>
  )
}
