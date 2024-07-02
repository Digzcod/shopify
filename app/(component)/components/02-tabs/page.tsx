'use client'
import React, { useState } from 'react'
import TabsBtn from '@/app/(component)/components/02-tabs/TabsBtn'
import Digz from '@/app/components/_tabs/Digz'
import Kher from '@/app/components/_tabs/Kher'
import Clint from '@/app/components/_tabs/Clint'
import TabsContent from './TabsContent'
import Navbar from '@/app/components/_landingPage/Navbar'

export default function TabsPage() {
 const [tabs, setTabs] = useState<string>("digz")

 const handleTabsName = (tabsName: string) =>{
  setTabs(tabsName)
 }

  return (
    <main className='flex flex-row'>
      <TabsBtn activeTabs={tabs} nameTabs={handleTabsName}/>
      <TabsContent>
        {tabs === 'digz' && <Digz/>}
        {tabs === 'kher' && <Kher/>}
        {tabs === 'clint' && <Clint/>}
      </TabsContent>
    </main>
  )
}
