'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product } from '../../types/product';
import { PICKUP_TYPE } from '../../types/common';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { changeStatus } from '@/utils/change-status';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';
import { EditDialog } from './edit-dialog';

const translations = {
  loading: 'Ачаалалж байна...',
  totalItems: 'Нийтэй бараа',
  totalAmount: 'Нийтэй дүн',
  invalidPhone: 'Утасны дугаар оруулна уу.',
};

export function SearchTable() {
  const router = useRouter();
  const [userData, setUserData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSearch = async ({ phoneNumber }: { phoneNumber?: string }) => {
    if (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
      setUserData([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${API_URL}/api/products/user/home?phoneNumber=${phoneNumber}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setUserData(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Failed to load data: ${error}`);
      setUserData([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((phoneNumber: string) => {
    handleSearch({ phoneNumber });
  }, 1500);

  useEffect(() => {
    if (phoneNumber) {
      debouncedSearch(phoneNumber);
    }
    return () => debouncedSearch.cancel();
  }, [phoneNumber]);

  const handleDelete = async ({ id }: { id: string }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      handleSearch({ phoneNumber });
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product.');
    }
  };

  const confirmDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      handleDelete({ id });
    }
  };

  if (loading) {
    return <div className='flex justify-center'>{translations.loading}</div>;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  const sum = userData.reduce((total, item) => total + (item.price || 0), 0);

  return (
    <>
      <div className='w-full md:w-[900px] flex justify-between items-center'>
        <Button onClick={() => router.push('/information')}>Буцах</Button>
        <label htmlFor='phoneNumber' className='sr-only'>
          Phone Number
        </label>
        <input
          id='phoneNumber'
          type='text'
          onChange={(e) => setPhoneNumber(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-sm'
        />
      </div>
      <Table aria-label='User products table'>
        <TableCaption>
          {translations.totalItems}:{userData.length}
        </TableCaption>
        <TableCaption>
          {translations.totalAmount}: {sum} ₮
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead className='w-[100px]'>Трак код</TableHead>
            <TableHead>Төлөв</TableHead>
            <TableHead>Хүлээж авах</TableHead>
            <TableHead>Утасны дугаар</TableHead>
            <TableHead>Дүн</TableHead>
            <TableHead className='text-right'>Үйлдэл</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((data, index) => (
            <TableRow key={data._id}>
              {data.trackingCode ? (
                <>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className='font-medium'>
                    {data.trackingCode}
                  </TableCell>
                  <TableCell>
                    <Badge variant='secondary'>
                      {changeStatus(data.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {data.pickupType === PICKUP_TYPE.PICKUP
                      ? 'Очиж авах'
                      : 'Хүргүүлж авах'}
                  </TableCell>
                  <TableCell>{data.phoneNumber}</TableCell>
                  <TableCell>
                    {data.price ? `${data.price} ₮` : 'Дүн оруулаагүй байна'}
                  </TableCell>
                  <TableCell className='flex items-center justify-end gap-2'>
                    <Button
                      variant='destructive'
                      onClick={() => confirmDelete(data._id)}
                    >
                      Устгах
                    </Button>
                    <EditDialog
                      row={data}
                      handleSearch={(phoneNumber: string) =>
                        handleSearch({ phoneNumber })
                      }
                      phoneNumber={phoneNumber}
                    />
                  </TableCell>
                </>
              ) : (
                <TableCell colSpan={7} className='text-center'>
                  No tracking code available
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
