import { SearchTable } from '@/sections/search-product';

const Page = () => {
  return (
    <div className='bg-[#EAEBFA] py-20 flex flex-col gap-10 items-center w-full min-h-screen pt-40 max-lg:px-5 dark:bg-[#070845]'>
      <h1 className='font-semibold text-2xl text-center'>
        Таны бүтээгдэхүүний мэдээлэл
      </h1>
      <div className='w-full md:w-[900px] flex flex-col gap-5'>
        <SearchTable />
      </div>
    </div>
  );
};

export default Page;
