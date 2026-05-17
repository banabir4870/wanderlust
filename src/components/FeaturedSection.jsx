import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import DestinationCard from './DestinationCard';

const FeaturedSection = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`)
    const destinations = await res.json();
    return (
        <div className='w-10/12 mx-auto my-8'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-6xl'>Featured Destinations</h1>
                    <p className='text-muted'>Handpicked travel experiences for the adventure seekers</p>
                </div>
                <div>
                    <Link href={'/destinations'}><Button variant='outline' className={'rounded-none text-cyan-500 border-cyan-500'}>All Destinations <FaArrowRightLong /></Button></Link>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-6 my-6'>
                {
                    destinations.map(destination => <DestinationCard key={destination._id} destination={destination}></DestinationCard>)
                }
            </div>
        </div>
    );
};

export default FeaturedSection;