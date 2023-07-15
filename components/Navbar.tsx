'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { BsSearch, BsBell } from 'react-icons/bs';
import { AiFillCaretDown } from 'react-icons/ai';

import useMediaQuery from '@/hooks/useMediaQuery';
import useMobileMenuModal from '@/hooks/useMobileMenuModal';

import NavbarItem from '@/components/NavbarItem';
import AccountMenu from '@/components/AccountMenu';

const TOP_OFFSET = 66;

const Navbar = () => {
  const isLargeScreens = useMediaQuery('(max-width: 1023px)');
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const { onOpen } = useMobileMenuModal();

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

  const openMobileMenu = () => {
    onOpen();
  };

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className='w-full fixed z-20'>
      <div
        className={`relative px-4 md:px-10 py-6 flex flex-row items-center transition 
        duration-500 ${showBackground ? 'bg-zinc-900/90' : ''}`}
      >
        <div className='flex md:hidden'>
          <Image
            className='object-contain h-10'
            src={'/images/logo-letter.png'}
            alt='logo'
            height={50}
            width={50}
            quality={100}
          />
        </div>
        <div className='hidden md:flex'>
          <Image
            className='object-contain w-[50px] md:w-[100px]'
            src={'/images/logo.png'}
            alt='logo'
            height={100}
            width={100}
            quality={100}
          />
        </div>

        {/* Larger Screens */}
        <div className='lg:flex hidden flex-row ml-8 gap-7'>
          <NavbarItem label='Home' />
          <NavbarItem label='TV Series' />
          <NavbarItem label='Movies' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' />
        </div>

        {/* Smaller Screens */}
        <div
          onClick={openMobileMenu}
          className='lg:hidden absolute top-12 md:top-auto left-[50%] translate-x-[-50%]
          flex flex-row gap-2 cursor-pointer'
        >
          <p className='text-white text-base drop-shadow-2xl'>Discover</p>
          <div className='flex items-center'>
            <AiFillCaretDown size={15} className='text-white transition' />
          </div>
          {/* <MobileMenu visible={showMobileMenu} /> */}
        </div>

        {/* End of Navbar */}
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
            <AiFillCaretDown
              size={isLargeScreens ? 15 : 20}
              className={`text-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
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
