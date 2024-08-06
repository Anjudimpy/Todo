import React from 'react';
import { PiNotepad } from "react-icons/pi";
import { IoTodayOutline } from "react-icons/io5";
import { IoIosStarOutline, IoMdPulse } from 'react-icons/io';
import { LuBookOpen } from "react-icons/lu";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { MdError } from "react-icons/md";
import PieClickNoSnap from './chart';

const LeftTodo = ({ isVisible }) => {
  return (
   <>
    {isVisible && (
<div>
<div className='bg-white mb-5  -mt-20 mr-2 sm:hidden'>
    <div className='flex gap-1'>
    <div className='flex gap-2 shadow-md  cursor-pointer px-2  py-2 w-full '>
    <span><PiNotepad className='text-[15px] text-gray-700'/> </span>
    <sapn className='font-semibold  text-[8px]'>All Task</sapn>
    </div>

    <div className='flex gap-2 shadow-md  cursor-pointer px-2  py-2 w-full '>
    <span><IoTodayOutline className='text-[15px] text-gray-700 '/> </span>
    <sapn className='font-semibold  text-[8px]'>Today</sapn>
    </div>

    <div className='flex gap-2 shadow-md  cursor-pointer px-2  py-2 w-full '>
    <span><IoIosStarOutline className='text-[15px] text-gray-700'/> </span>
    <sapn className='font-semibold text-[8px]'>Important</sapn>
    </div>
    </div>

    <div className='flex gap-1'>
    <div className='flex gap-2 shadow-md cursor-pointer px-2  py-2 w-full '>
    <span><LuBookOpen className='text-[15px] text-gray-700'/> </span>
    <sapn className='font-semibold  text-[8px]'>Planned</sapn>
    </div>

    <div className='flex gap-2 shadow-md cursor-pointer px-2  py-2 w-full '>
    <span><MdOutlineAssignmentInd className='text-[15px] text-gray-700'/> </span>
    <sapn className='font-semibold  text-[8px] '>Assigned to me</sapn>
    </div>

    {/* <div className='flex gap-2 shadow-md cursor-pointer  px-2  py-2  w-full '>
    <span><GoPlus className='text-[15px] text-gray-700'/> </span>
    <sapn className='font-semibold  text-[8px] '>Add List</sapn>
    </div> */}
    
    </div>


   
   
</div>
    <div>
        
     
    <div className='xl:w-[290px] sm:block hidden w-[200px] h-[900px] bg-green-50'>
        
        <div className='relative'>
            <div className='absolute xl:-top-14 -top-10 left-[25%]'>
            <img src="gdp.jpg" alt="User Profile"
        className='rounded-full xl:w-32 xl:h-32 h-20 w-20 mb-3' />
        <sapn className='flex w-full justify-center'>Hey, ANJU</sapn>
            </div>

        </div>
<div className='flex justify-center'>
    
<div className='absolute xl:mt-40 mt-32 xl:h-[250px] h-[200px] xl:w-[240px] w-[160px] bg-white'>
<div className='flex gap-2 cursor-pointer px-5 pt-7 w-full '>
    <span><PiNotepad className='xl:text-[27px] text-gray-700'/> </span>
    <sapn className='font-semibold xl:text-[15px] text-[10px]'>All Task</sapn>
    </div>

    <div className='flex gap-2 cursor-pointer px-5  pt-4 w-full '>
    <span><IoTodayOutline className='xl:text-[24px] text-gray-700 '/> </span>
    <sapn className='font-semibold xl:text-[15px] text-[10px]'>Today</sapn>
    </div>

    <div className='flex gap-2 cursor-pointer px-5 pt-4 w-full '>
    <span><IoIosStarOutline className='xl:text-[27px] text-gray-700'/> </span>
    <sapn className='font-semibold xl:text-[15px] text-[10px]'>Important</sapn>
    </div>

    <div className='flex gap-2 cursor-pointer px-5 pt-4  w-full '>
    <span><LuBookOpen className='xl:text-[27px] text-gray-700'/> </span>
    <sapn className='font-semibold xl:text-[15px] text-[10px]'>Planned</sapn>
    </div>

    <div className='flex gap-2 cursor-pointer  px-5 pt-4  w-full '>
    <span><MdOutlineAssignmentInd className='xl:text-[27px] text-gray-700'/> </span>
    <sapn className='font-semibold xl:text-[15px] text-[10px]'>Assigned to me</sapn>
    </div>


    <div className='flex gap-2 cursor-pointer px-5 py-6 mt-10 bg-white xl:w-[240px] xl:h-[80px]'>
    <span>< GoPlus className='xl:text-[28px]'/></span>
    <span className='font-semibold xl:text-[15px] text-[10px]'>Add List</span>
</div>

<div>
<div className=' mt-3  bg-white xl:w-[240px] xl:h-[320px]'>
    <div className='flex justify-between xl:text-[15px] text-[10px]  py-6 px-5 gap-2'><span>Today Task
        <p>11</p>
    </span>
    <span><MdError className='text-gray-300 text-[20px]'/></span></div>
    <hr></hr>

   <div className=' absolute flex justify-center'> 
   <div className='xl:-my-14 xl:-ml-8 -ml-[74px] -my-10'>
  <PieClickNoSnap 
    width={200}
    height={300} />
</div>
   </div>

</div>
</div>
</div>


</div>

   </div>
    </div>
</div>

      
    )}
   </>
  )
}

export default LeftTodo