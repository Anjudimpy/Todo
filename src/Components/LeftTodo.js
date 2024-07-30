import React from 'react';
import { PiNotepad } from "react-icons/pi";
import { IoTodayOutline } from "react-icons/io5";
import { IoIosStarOutline, IoMdPulse } from 'react-icons/io';
import { LuBookOpen } from "react-icons/lu";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { MdError } from "react-icons/md";
import PieClickNoSnap from './chart';

const LeftTodo = () => {
  return (
    <div className=''>
        <div className='relative '>
            <div className='absolute -top-14 left-[25%]'>
            <img src="gdp.jpg" alt="User Profile"
        className='rounded-full w-32 h-32  mb-3' />
        <sapn className='flex w-full justify-center'>Hey, ANJU</sapn>
            </div>

        </div>
<div className='flex justify-center'>
    
<div className='absolute mt-40 h-[250px] w-[240px] bg-white'>
<div className='flex gap-2  px-5 pt-7 w-full '>
    <span><PiNotepad className='text-[27px] text-gray-700'/> </span>
    <sapn className='font-semibold'>All Task</sapn>
    </div>

    <div className='flex gap-2  px-5  pt-4 w-full '>
    <span><IoTodayOutline className='text-[24px] text-gray-700 '/> </span>
    <sapn className='font-semibold'>Today</sapn>
    </div>

    <div className='flex gap-2  px-5 pt-4 w-full '>
    <span><IoIosStarOutline className='text-[27px] text-gray-700'/> </span>
    <sapn className='font-semibold'>Important</sapn>
    </div>

    <div className='flex gap-2  px-5 pt-4  w-full '>
    <span><LuBookOpen className='text-[27px] text-gray-700'/> </span>
    <sapn className='font-semibold'>Planned</sapn>
    </div>

    <div className='flex gap-2  px-5 pt-4  w-full '>
    <span><MdOutlineAssignmentInd className='text-[27px] text-gray-700'/> </span>
    <sapn className='font-semibold'>Assigned to me</sapn>
    </div>


    <div className='flex gap-2 px-5 py-6 mt-10 bg-white w-[240px] h-[80px]'>
    <span>< GoPlus className='text-[28px]'/></span>
    <span className='font-semibold'>Add List</span>
</div>

<div>
<div className=' mt-3  bg-white w-[240px] h-[320px]'>
    <div className='flex justify-between   py-6 px-5 gap-2'><span>Today Task
        <p>11</p>
    </span>
    <span><MdError className='text-gray-300 text-[20px]'/></span></div>
    <hr></hr>

   <div className=' absolute flex justify-center'> 
    <div className='-my-14 -ml-8'><PieClickNoSnap/></div>
   </div>

</div>
</div>
</div>


</div>



    </div>
  )
}

export default LeftTodo