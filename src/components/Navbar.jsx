'use client'
import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiUser } from 'react-icons/fi';

const Navbar = () => {
    const userData = authClient.useSession()
    const user = userData.data?.user;
    const handleLogOut = async () => {
        await authClient.signOut()
    }
    return (
        <div className='bg-white shadow-sm p-4'>
            <nav className='flex justify-between items-center w-10/12 mx-auto'>
                <ul className='flex gap-8 items-center'>
                    <li><Link href={'/'}>Home</Link></li>
                    <li><Link href={'/destinations'}>Destinations</Link></li>
                    <li><Link href={'/my-bookings'}>My Bookings</Link></li>
                    <li><Link href={'/add-destination'}>Add Destination</Link></li>
                </ul>
                <div>
                    <Image src={'/assets/Wanderlast.png'} alt='wanderlast-logo' width={150} height={150}></Image>
                </div>
                <div>
                    {user ? <div className='flex items-center gap-4'>
                        <Avatar>
                            <Avatar.Image referrerPolicy="no-referrer" alt={user?.name} src={user?.image} />
                            <Avatar.Fallback>{user?.name[0]}</Avatar.Fallback>
                        </Avatar>
                        <h2>{user?.name},</h2>
                        <Link href={'/profile'} className='flex gap-1 items-center'><FiUser />Profile</Link>
                        <Button onClick={handleLogOut} variant="danger-soft" className={'rounded-none'}>Log Out</Button>
                    </div>
                        :
                        <ul className='flex items-center gap-6'>
                            <li><Link href={'/login'}>Log In</Link></li>
                            <li><Link href={'/signup'}>Sign Up</Link></li>
                        </ul>}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;