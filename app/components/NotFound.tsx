/* eslint-disable react/no-unescaped-entities */

import Image from 'next/image'
import React from 'react'
import Img from "../../public/not-img/404 Erro.svg"

const NotFound = () => {
  return (
    <div className='grid items-center'>
      <Image src={Img} alt=""/>
      <span className='text-xl font-semibold'>Opps! Status 404 this page doesn't exist</span>
    </div>
  )
}

export default NotFound