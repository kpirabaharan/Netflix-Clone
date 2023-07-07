interface NavbarItemProps {
  label: string;
}

const NavbarItem = ({ label }: NavbarItemProps) => {
  return (
    <p className='text-white cursor-pointer hover:opacity-70 transition'>
      {label}
    </p>
  );
};

export default NavbarItem;
