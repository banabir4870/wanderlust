import BookingCard from '@/components/BookingCard';
import { DeleteDestination } from '@/components/DeleteDestination';
import { DestinationEditModal } from '@/components/DestinationEditModal';
import { auth } from '@/lib/auth';
import { Button, CalendarHeader, Card } from '@heroui/react';
import { headers } from 'next/headers';
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
    const {token} = await auth.api.getToken({
        headers: await headers()
    })
    console.log('token: ', token)
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    const destination = await res.json();
    const { imageUrl, country, destinationName, duration, description } = destination;
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
                <BookingCard destination={destination}></BookingCard>
            </div>

        </div>
    );
};

export default DestinationDetailsPage;