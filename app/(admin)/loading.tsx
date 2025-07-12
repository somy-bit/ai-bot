import Avatar from '@/components/Avatar'
import React from 'react'

function Loading() {
  return (
    <div className='mx-auto p-10 anmate-spin'>
        <Avatar seed="PAPAFAM agent" />
    </div>
  )
}

export default Loading