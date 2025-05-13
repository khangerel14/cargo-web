'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product } from '../../types/product';
import { PICKUP_TYPE, STATUS } from '../../types/common';
import { useCallback, useEffect, useState } from 'react';
import { changeStatus } from '@/utils/change-status';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import dayjs from 'dayjs';

type Props = Readonly<{
  phoneNumber: string;
}>;

const translations = {
  loading: 'Ачаалалж байна...',
  totalItems: 'Нийтэй бараа',
  totalAmount: 'Нийтэй дүн',
  invalidPhone: 'Утасны дугаар оруулна уу.',
};

export function UserTable({ phoneNumber }: Props) {
  const [userData, setUserData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!phoneNumber) {
      setUserData([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/products/user?phoneNumber=${encodeURIComponent(phoneNumber)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setUserData(Array.isArray(data) ? data : data ? [data] : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Failed to load data: ${error}`);
      setUserData([]);
    } finally {
      setLoading(false);
    }
  }, [phoneNumber]);

  const handlePickUp = async ({ phone }: { phone: string }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products/put-products`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phone,
          pickupType:
            userData?.[0]?.pickupType === 'pickup'
              ? PICKUP_TYPE.DELIVERY
              : PICKUP_TYPE.PICKUP,
        }),
      });

      const data = await response.json();
      console.log('Response:', data);
      fetchData();
    } catch (error) {
      console.error('Error updating pickup type:', error);
      setError('Failed to update pickup type');
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div className='flex justify-center'>Ачаалалж байна...</div>;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  if (!userData || userData.length === 0) {
    return <div>Таны бүртгэлтэй бараа байхгүй байна</div>;
  }

  const sum = userData
    .filter((item) => item.status !== STATUS.HANDED_OVER)
    .reduce((total, item) => total + (item.price || 0), 0);

  const sumNumber = userData?.filter(
    (item) => item.status !== STATUS.HANDED_OVER && item.price > 0
  ).length;

  return (
    <Card>
      <div className='w-full md:w-[1000px] flex justify-between my-5'>
        <div className='flex items-center gap-2'>
          <p>
            {translations.totalItems}: {sumNumber}
          </p>
          <p>
            {translations.totalAmount}: {sum} ₮
          </p>
        </div>
        <Button
          variant='outline'
          onClick={() => handlePickUp({ phone: phoneNumber })}
        >
          {userData[0].pickupType === PICKUP_TYPE.PICKUP
            ? 'Хүргүүлж авах болгох'
            : 'Очиж авах болгох'}
        </Button>
      </div>
      <Table aria-label='User products table'>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead className='w-[100px]'>Трак код</TableHead>
            <TableHead>Төлөв</TableHead>
            <TableHead>Хүлээж авах</TableHead>
            <TableHead>Утасны дугаар</TableHead>
            <TableHead>Дүн</TableHead>
            <TableHead className='text-right'>Огноо</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData
            .filter((item: Product) => item.status !== STATUS.HANDED_OVER)
            .map((data: Product, index) => (
              <TableRow key={index}>
                {data.trackingCode ? (
                  <>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className='font-medium'>
                      {data.trackingCode}
                    </TableCell>
                    <TableCell>
                      <Badge>{changeStatus(data.status)}</Badge>
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
                    <TableCell className='text-right'>
                      {dayjs(data.updatedAt).format('DD-MM-YYYY')}
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
    </Card>
  );
}
