import DestinationCard from '@/components/DestinationCard';
import React from 'react';

const DestinationPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`)
    const destinations = await res.json()
    console.log(destinations);
    return (
        <div className='my-6 w-10/12 mx-auto'>
            <h1 className='text-4xl mb-6'>Explore All Destinations</h1>
            <div className='grid grid-cols-3 gap-6'>
                {
                    destinations.map(destination => <DestinationCard key={destination._id} destination={destination}></DestinationCard>)
                }
            </div>
        </div>
    );
};

export default DestinationPage;