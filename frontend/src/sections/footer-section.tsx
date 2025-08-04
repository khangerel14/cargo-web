import Image from 'next/image';

export const FooterSection = () => {
  return (
    <div className='p-8 flex justify-between bg-[#d7cff1] flex-col sm:flex-row items-start dark:bg-[#3c479a40] w-full gap-10'>
      <div className='flex flex-col gap-2'>
        <h1 className='font-semibold'>Star Cargo</h1>
        <h1>Холбогдох утас:</h1>
        <div className='flex flex-col'>
          <p>☎️ +976 99937038</p>
          <p>☎️ +976 99937591 </p>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h1>Карго төрөлжсөн үйлчилгээ</h1>
        <div className='flex items-start gap-2'>
          <h1>📌 Манай хаяг:</h1>
          <h1>Дөлгөөн нуурын баруун талд “Мөрөн төв”-ийн 2 давхарт 301 тоот</h1>
        </div>
        <div className='flex items-start gap-2'>
          <h1>📌 Цагийн хуваарь:</h1>
          <div className='flex items-start gap-2 flex-col'>
            <h1>Даваагаас - Баасан гаригт 11:00-20:00</h1>
            <h1>Бямба гаригт 12:00-16:00</h1>
            <h1>Ням гаригт амрана</h1>
          </div>
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
