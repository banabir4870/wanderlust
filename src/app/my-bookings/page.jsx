import { BookingCancelAlert } from '@/components/BookingCancelAlert';
import { auth } from '@/lib/auth';
import { Button, Card } from '@heroui/react';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';

const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    const user = session?.user;
    const res = await fetch(`http://localhost:5000/booking/${user?.id}`)
    const bookings = await res.json();
    return (
        <div className='w-10/12 mx-auto my-10'>
            <div className='my-6'>
                <h1 className='text-5xl'>My Bookings</h1>
                <p>Manage and view your upcoming travel plans</p>
            </div>
            <div className='grid grid-cols-1 gap-6'>
                {
                    bookings.map(booking => 
                    <div key={booking._id}>
                        <Card className='rounded-none border'>
                        <div className='flex gap-4'>
                            <div>
                                <Image src={booking.imageUrl} alt={booking.destinationName} height={300} width={300}></Image>
                            </div>
                            <div className='space-y-2'>
                                <h1 className='text-5xl font-bold'>{booking.destinationName}</h1>
                                <p className='flex items-center gap-2'><SlCalender/> Departure: {new Date(booking.departureDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</p>
                                <p>Booking Id: {booking._id}</p>
                                <h2 className='text-3xl text-cyan-600'>${booking.price}</h2>
                                <div className='flex gap-4'>
                                    <BookingCancelAlert booking={booking}></BookingCancelAlert>
                                    <Button className={'rounded-none'}><BsEye/>View</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyBookingsPage;