'use client';
import { Badge } from "./tailgrids/core/badge";

export default function Header() {
  return (
    // header container
    <div className='mt-4 text-center'>
      {/* code */}
      <div className='flex justify-center gap-4'>
        <Badge className='text-3xl rounded-lg py-1 px-3 bg-red-500 text-gray-200 rotate-7'>C</Badge>
        <Badge className='text-3xl rounded-lg py-1 px-3 bg-green-700 text-gray-200 rotate-350'>S</Badge>
        <Badge className='text-3xl rounded-lg py-1 px-3 bg-blue-700 text-gray-200 rotate-7'>I</Badge>
        <Badge className='text-3xl rounded-lg py-1 px-3 bg-blue-400 text-gray-200 rotate-350'>2</Badge>
        <Badge className='text-3xl rounded-lg py-1 px-3 bg-yellow-400 text-gray-200 rotate-7'>0</Badge>
        <Badge className='text-3xl rounded-lg py-1 px-3 bg-gray-500 text-gray-200 rotate-350'>5</Badge>
      </div>
      {/* name */}
      <div className='mt-4'>
        <Badge className='text-xl text-white bg-black rounded-lg py-1 px-3'>FRONT END SOFTWARE DEVELOPMENT</Badge>
      </div>
    </div>
  );
}
