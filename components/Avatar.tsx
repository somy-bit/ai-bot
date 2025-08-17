'use client'

import React from 'react'
import Image from 'next/image'
import { createAvatar } from '@dicebear/core'
import { rings } from '@dicebear/collection'

function Avatar({ seed, className }: { seed: string; className?: string }) {
  const avatar = createAvatar(rings, { seed: seed || 'default' })
  const dataUri = avatar.toDataUri() // 

  return (
    <Image
      src={dataUri}
      alt="User Avatar"
      width={100}
      height={100}
      className={className}
    />
  )
}

export default Avatar
