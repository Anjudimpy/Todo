import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoIosMenu } from 'react-icons/io'
import GridViewIcon from '@mui/icons-material/GridView';
import { RiMoonClearLine } from "react-icons/ri";

const Header = ({ toggleVisibility }) => {
  
  return (
    <div className=' w-full'>
      <div className='flex sm:px-14 px-2 py-3 justify-between w-full'>
        <div className='flex gap-4'>
   <span onClick={toggleVisibility}><IoIosMenu className='text-[2.5rem] py-1'/></span>
   <span>
    <img src='logo.png' className='h-8'/>
   </span>
        </div>
         <div className='sm:flex gap-5 py-1 hidden'>
          <span className='text-[1.5rem]'><CiSearch/></span>
          <span><GridViewIcon /></span>
          <span><RiMoonClearLine className='text-[1.5rem]'/></span>
        </div>
      </div>
    </div>
  )
}

export default Header
