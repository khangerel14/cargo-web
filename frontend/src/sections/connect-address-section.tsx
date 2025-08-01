'use client';

import { Icon } from '@iconify/react';
import ClipboardJS from 'clipboard';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ConnectAddressSection = () => {
  useEffect(() => {
    const clipboard = new ClipboardJS('.copy-btn');

    clipboard.on('success', (e) => {
      const copiedText = e.text.includes('15547926009')
        ? 'Утасны дугаар'
        : 'Хаяг';
      toast.success(`${copiedText} амжилттай хуулсан!`, {
        position: 'top-right',
        autoClose: 3000,
      });
    });

    clipboard.on('error', () => {
      toast.error('Хуулахад алдаа гарлаа!', {
        position: 'top-right',
        autoClose: 3000,
      });
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  return (
    <div className='bg-[#EAEBFA] flex flex-col gap-10 items-center justify-center w-full min-h-screen max-lg:px-5 dark:bg-[#070845]'>
      <h1 className='font-semibold text-2xl text-center'>Хаяг холбох заавар</h1>
      <div className='max-w-[850px] flex items-start gap-24 max-md:flex-col'>
        <div className='flex flex-col items-start max-w-[400px] gap-10'>
          <div className='flex items-center gap-3'>
            <h1 className='font-medium text-md'>Утасны дугаар:</h1>
            <h1 className='font-medium text-md'>155 4792 6009</h1>
            <button
              className='copy-btn cursor-pointer'
              data-clipboard-text='15547926009'
              aria-label='Copy phone number'
            >
              <Icon icon='solar:copy-outline' />
            </button>
          </div>
          <div className='flex items-start gap-3'>
            <h1 className='font-medium text-md'>Хаяг:</h1>
            <h1 className='font-medium text-md'>
              内蒙古自治区，二连浩特市，社区建设管理区，环宇商贸城9栋24号 A2324
              (өөрийн нэр, утасны дугаар)
            </h1>
            <button
              className='copy-btn cursor-pointer'
              data-clipboard-text='内蒙古自治区，二连浩特市，社区建设管理区，环宇商贸城9栋24号 A2324 (өөрийн нэр, утасны дугаар)'
              aria-label='Copy address'
            >
              <Icon icon='solar:copy-outline' />
            </button>
          </div>
        </div>
        <div className='flex flex-col items-start gap-5'>
          <h1 className='font-medium text-md'>Санамж:</h1>
          <h1 className='font-medium text-md'>
            Тэмдэг дээр дарж хуулж авна уу! (Copy)
          </h1>
          <h1 className='font-medium text-md'>
            Хаягаа үнэн зөв оруулсан эсэхээ шалгана уу!
          </h1>
        </div>
      </div>
      <div className='flex items-center gap-5 mt-10 max-md:flex-col'>
        <a
          target='_blank'
          href='https://www.facebook.com/permalink.php/?story_fbid=122105808830572311&id=61567169340089'
        >
          ✅✅✅ TAOBAO ДЭЭР ЭРЭЭН ДЭХЬ ХАЯГ ХОЛБОХ ЗААВАР
        </a>
        <a
          target='_blank'
          href='https://www.facebook.com/permalink.php/?story_fbid=122105872424572311&id=61567169340089'
        >
          📍📍📍 PINDUODUO ДЭЭР ЭРЭЭН ДЭХЬ ХАЯГ ХОЛБОХ ЗААВАР
        </a>
      </div>
      <ToastContainer />
    </div>
  );
};
