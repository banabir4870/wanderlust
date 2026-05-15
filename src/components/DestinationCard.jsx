import { Button, Card } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { MdArrowOutward } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';

const DestinationCard = ({destination}) => {
    const {_id, imageUrl, country, destinationName, price, duration} = destination;
    return (
            <Card className='border'>
                <Image className='w-full h-[300px] rounded-2xl' src={imageUrl} alt={destinationName} width={800} height={800}></Image>
                <div className='space-y-2'>
                    <p className='flex items-center gap-2 text-gray-500'><CiLocationOn />{country}</p>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-2xl font-medium'>{destinationName}</h2>
                        <h3 className='font-xl font-bold'>${price}<span className='text-sm text-gray-400'>/person</span></h3>
                    </div>
                    <p className='flex items-center gap-2 text-gray-500'><SlCalender /> {duration}</p>
                </div>
                <Link href={`/destinations/${_id}`}><Button variant='outline' className={'text-[#15A1BF] text-lg border-[#15A1BF] flex items-center hover:bg-blue-500 hover:text-white'}>Book Now <MdArrowOutward className='size-6' /></Button></Link>
            </Card>
    );
};

export default DestinationCard;