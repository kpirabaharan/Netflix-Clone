interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu = ({ visible }: MobileMenuProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      className='absolute top-8 -left-4 flex flex-col bg-zinc-950 w-40 py-4 
      border-2 border-gray-800 rounded-lg'
    >
      <div className='flex flex-col gap-4'>
        <div className='px-3 text-center text-white hover:underline'>Home</div>
        <div className='px-3 text-center text-white hover:underline'>
          TV Shows
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          Movies
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          Recently Added
        </div>
        <div className='px-3 text-center text-white hover:underline'>
          My List
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
