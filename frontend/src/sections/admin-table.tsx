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
import { useCallback, useEffect, useState } from 'react';
import { ProductDialog } from './product-dialog';
import { changeStatus } from '@/utils/change-status';
import { Badge } from '@/components/ui/badge';
import { EditDialog } from './edit-dialog';

export function AdminTable() {
  const [userData, setUserData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'
        }/api/products/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(Array.isArray(data) ? data : data ? [data] : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Failed to load data: ${error}`);
      setUserData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async ({ id }: { id: string }) => {
    try {
      const product = userData?.find((item) => item._id === id);
      if (!product) return;

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'
        }/api/products/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          //   body: JSON.stringify({ pickupType: newPickupType }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update pickup type');
      }

      fetchData();
    } catch (error) {
      console.error('Error updating pickup type:', error);
      setError('Failed to update pickup type.');
    }
  };

  if (loading) {
    return <div className='flex justify-center'>Ачаалалж байна...</div>;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  const sum = userData?.reduce((total, item) => total + (item.price || 0), 0);

  return (
    <>
      <div className='w-full md:w-[900px] flex justify-end'>
        <ProductDialog fetchData={fetchData} />
      </div>
      <Table aria-label='User products table'>
        {userData && userData.length > 0 && (
          <>
            <TableCaption>Нийтэй бараа: {userData?.length}</TableCaption>
            <TableCaption>Нийтэй дүн: {sum} ₮</TableCaption>
          </>
        )}
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
          {userData?.map((data: Product, index) => (
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
                      color='error'
                      variant='outline'
                      onClick={() => handleDelete({ id: data._id })}
                    >
                      Устгах
                    </Button>
                    <EditDialog row={data} fetchData={fetchData} />
                  </TableCell>
                </>
              ) : (
                <TableCell colSpan={6} className='text-center'>
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
