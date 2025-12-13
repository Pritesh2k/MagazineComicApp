import React from 'react'
import StartupTop from './StartupTop'
import StartupBottom from './StartupBottom'

function StartupPage() {
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen'>
        <div className='flex justify-center items-center w-full h-2/5 bg-red-700'>
            <StartupTop />
        </div>
        <div className='flex justify-center items-center w-full h-3/5'>
            <StartupBottom />
        </div>
    </div>
  )
}

export default StartupPage