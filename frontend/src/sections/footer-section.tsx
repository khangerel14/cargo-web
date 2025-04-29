import Image from 'next/image';

export const FooterSection = () => {
  return (
    <div className='p-8 flex justify-between bg-[#d7cff1] flex-col sm:flex-row items-start dark:bg-[#3c479a40] w-full gap-10'>
      <div className='flex flex-col gap-2'>
        <h1 className='font-semibold'>Star Cargo</h1>
        <h1>Холбогдох утас:</h1>
        <div className='flex flex-col'>
          <p>☎️ +976 99937038</p>
          <p>☎️ +976 88733876 </p>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h1>Карго төрөлжсөн үйлчилгээ</h1>
        <div className='flex items-start gap-2'>
          <h1>📌 Манай хаяг:</h1>
          <h1>5-р сургуулийн баруун талд 41-р байр</h1>
        </div>
      </div>
      <div className='flex flex-col items-start gap-2'>
        <a
          href='https://www.facebook.com/profile.php?id=61567169340089&mibextid=wwXIfr&rdid=4MFhW2nGgGZi8HKi#'
          className='flex items-center gap-2'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            src={'/facebook.png'}
            alt='star cargoo'
            width={25}
            height={24}
          />
          <span className='text-sm'>Facebook</span>
        </a>
      </div>
    </div>
  );
};
