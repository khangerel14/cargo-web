import Image from 'next/image';

export const FooterSection = () => {
  return (
    <div className='p-5 flex sm:items-center justify-between h-20 bg-white flex-col sm:flex-row items-start dark:bg-[#09125a] w-full'>
      <h1 className='font-semibold'>Star Cargo</h1>
      <div>Карго төрөлжсөн үйлчилгээ</div>
      <div>
        <a
          href='https://www.facebook.com/profile.php?id=61567169340089&mibextid=wwXIfr&rdid=4MFhW2nGgGZi8HKi#'
          className='flex items-center gap-2 text-gray-600'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            src={'/facebook.png'}
            alt='star cargoo'
            width={25}
            height={24}
          />
        </a>
      </div>
    </div>
  );
};
