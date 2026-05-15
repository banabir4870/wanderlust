import { AlertTitle } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiUser } from 'react-icons/fi';

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center bg-white shadow-sm p-4'>
            <ul className='flex gap-8 items-center'>
                <li><Link href={'/'}>Home</Link></li>
                <li><Link href={'/destinations'}>Destinations</Link></li>
                <li><Link href={'/my-bookings'}>My Bookings</Link></li>
                <li><Link href={'/add-destination'}>Add Destination</Link></li>
            </ul>
            <div>
                <Image src={'/assets/Wanderlast.png'} alt='wanderlast-logo' width={150} height={150}></Image>
            </div>
            <ul className='flex gap-8 items-center'>
                <li><Link href={'/profile'} className='flex gap-1 items-center'><FiUser />Profile</Link></li>
                <li><Link href={'/login'}>Log In</Link></li>
                <li><Link href={'/signup'}>Sign Up</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;