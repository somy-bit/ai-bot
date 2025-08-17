import Avatar from '@/components/Avatar'
import React from 'react'

function Loading() {
  return (
    <div className='mx-auto p-10 w-full h-full flex items-center justify-center'>
        <Avatar className='animate-spin' seed="PAPAFAM agent" />
    </div>
  )
}

export default Loading