import { DeleteDestination } from '@/components/DeleteDestination';
import { DestinationEditModal } from '@/components/DestinationEditModal';
import { Button, CalendarHeader, Card } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiArrowBack, BiArrowFromRight } from 'react-icons/bi';
import { CiLocationOn } from 'react-icons/ci';
import { FaCheck, FaRegEdit } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { SlCalender } from 'react-icons/sl';
import { TiTick } from 'react-icons/ti';

const DestinationDetailsPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:5000/destination/${id}`)
    const destination = await res.json();
    const { imageUrl, country, destinationName, price, duration, departureDate, description } = destination;
    return (
        <div className='w-10/12 mx-auto my-6'>
            <div className='flex justify-between items-center my-4'>
                <Link href={'/destinations'}><Button variant='ghost' className={'inline-flex items-center'}><BiArrowBack></BiArrowBack> Back To Destinations</Button></Link>
                <div className='flex gap-2'>
                    <DestinationEditModal destination={destination}></DestinationEditModal>
                    <DeleteDestination destination={destination}></DeleteDestination>
                </div>
            </div>
            <Image src={imageUrl} alt={destinationName} width={1500} height={1500} className='w-full h-[80vh] object-cover rounded-2xl'></Image>
            <div className='my-4 flex justify-between gap-10'>
                <div className='space-y-2 flex-1'>
                    <h4 className='flex items-center gap-2'><CiLocationOn />{country}</h4>
                    <h1 className='text-6xl'>{destinationName}</h1>
                    <p className='flex items-center gap-2 text-gray-500'><SlCalender /> {duration}</p>
                    <div className='mt-4 space-y-2'>
                        <h1 className='text-3xl'>Overview</h1>
                        <p>{description}</p>
                    </div>
                </div>
                <Card className='border'>
                    <p className='text-gray-500'>Starting From</p>
                    <h2 className='text-cyan-500 text-2xl'>${price}</h2>
                    <p className='text-gray-500'>Per Person</p>

                    <h3 className='border p-2'>{departureDate}</h3>
                    <Button variant='secondary' className={'w-full rounded-none'}>Book Now <FaArrowRightLong /></Button>
                    <ul>
                        <li className='flex gap-2 items-center'><FaCheck className='text-green-300' />Free Cancellation Up To 7 Days</li>
                        <li className='flex gap-2 items-center'><FaCheck className='text-green-300' />Travel Insurance Included</li>
                        <li className='flex gap-2 items-center'><FaCheck className='text-green-300' />24/7 Customer Support</li>
                    </ul>
                </Card>
            </div>

        </div>
    );
};

export default DestinationDetailsPage;