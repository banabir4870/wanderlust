'use client'
import { authClient } from '@/lib/auth-client';
import { Button, Calendar, Card, DateField, Label } from '@heroui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';

const BookingCard = ({ destination }) => {
    const userData = authClient.useSession()
    const user = userData.data?.user;
    const [departureDate, setDepartureDate] = useState(null)
    const { price, _id, destinationName, imageUrl, country } = destination

    const handleBooking = async () =>{
        const bookingData = {
            userId: user?.id,
            userImage: user?.image,
            userName: user?.name,
            destinationId: _id,
            destinationName,
            price,
            imageUrl,
            country,
            departureDate: new Date(departureDate)
        }
        


        const res = await fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })

        const data = await res.json()
        toast.success(`${destinationName} Booked Successfully`)
    }
    return (
        <Card className='border rounded-none'>
            <p className='text-gray-500'>Starting From</p>
            <h2 className='text-cyan-500 text-2xl'>${price}</h2>
            <p className='text-gray-500'>Per Person</p>

            <DateField onChange={setDepartureDate} className="w-full rounded-none" name="date">
                <Label>Date</Label>
                <DateField.Group>
                    <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                </DateField.Group>
            </DateField>
            <Button onClick={handleBooking} variant='secondary' className={'w-full rounded-none'}>Book Now <FaArrowRightLong /></Button>
            <ul>
                <li className='flex gap-2 items-center'><FaCheck className='text-green-300' />Free Cancellation Up To 7 Days</li>
                <li className='flex gap-2 items-center'><FaCheck className='text-green-300' />Travel Insurance Included</li>
                <li className='flex gap-2 items-center'><FaCheck className='text-green-300' />24/7 Customer Support</li>
            </ul>
        </Card>
    );
};

export default BookingCard;