'use client'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { profileStore } from './store'

interface StoreProps {
    children: ReactNode
}

const StoreProvider = ({children}: StoreProps) => {
  return <Provider store={profileStore}>{children}</Provider>
  
}

export default StoreProvider