'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';

import NavbarItem from '@/components/NavbarItem';
import MobileMenu from '@/components/MobileMenu';
import AccountMenu from '@/components/AccountMenu';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className='w-full fixed z-40'>
      <div
        className={`px-4 md:px-10 py-6 flex flex-row items-center transition 
        duration-500 ${showBackground ? 'bg-zinc-900/90' : ''}`}
      >
        <Image
          className='object-contain w-[50px] md:w-[100px]'
          src={'/images/logo.png'}
          alt='logo'
          height={100}
          width={100}
          quality={100}
        />

        <div className='lg:flex hidden flex-row ml-8 gap-7'>
          <NavbarItem label='Home' />
          <NavbarItem label='TV Shows' />
          <NavbarItem label='Movies' />
          <NavbarItem label='Recently Added' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browse' />
        </div>

        <div
          onClick={toggleMobileMenu}
          className='lg:hidden flex flex-row items-center gap-2 ml-8 
          cursor-pointer relative'
        >
          <p className='text-white text-sm'>Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? 'rotate-0' : '-rotate-90'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className='flex flex-row ml-auto gap-7 items-center'>
          <div className='text-gray-200 hover:opacity-70 cursor-pointer transition'>
            <BsSearch />
          </div>
          <div className='text-gray-200 hover:opacity-70 cursor-pointer transition'>
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className='flex flex-row items-center gap-2 cursor-pointer relative'
          >
            <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
              <Image
                src={'/images/avatar-slate.png'}
                alt='Profile'
                height={500}
                width={500}
              />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? 'rotate-0' : '-rotate-90'
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
