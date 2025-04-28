// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { cn } from '@/lib/utils';
// import { BellRing, Check } from 'lucide-react';
// import Image from 'next/image';

// const notifications = [
//   {
//     title: 'Your call has been confirmed.',
//     description: '1 hour ago',
//   },
//   {
//     title: 'You have a new message!',
//     description: '1 hour ago',
//   },
//   {
//     title: 'Your subscription is expiring soon!',
//     description: '2 hours ago',
//   },
// ];

// type CardProps = React.ComponentProps<typeof Card>;

// export const LogInSection = ({ className, ...props }: CardProps) => {
//   return (
//     <div className='bg-[#EAEBFA] flex items-center justify-between w-full min-h-screen'>
//       <div className='w-1/2'>
//         <Image
//           src={'/background.webp'}
//           alt='star cargoo'
//           width={500}
//           height={500}
//           className={'w-full'}
//         />
//       </div>
//       <div className='w-1/2 flex items-center justify-center'>
//         <Card className={cn('w-[380px]', className)} {...props}>
//           <CardHeader>
//             <CardTitle>Notifications</CardTitle>
//             <CardDescription>You have 3 unread messages.</CardDescription>
//           </CardHeader>
//           <CardContent className='grid gap-4'>
//             <div className=' flex items-center space-x-4 rounded-md border p-4'>
//               <BellRing />
//               <div className='flex-1 space-y-1'>
//                 <p className='text-sm font-medium leading-none'>
//                   Push Notifications
//                 </p>
//                 <p className='text-sm text-muted-foreground'>
//                   Send notifications to device.
//                 </p>
//               </div>
//             </div>
//             <div>
//               {notifications.map((notification, index) => (
//                 <div
//                   key={index}
//                   className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'
//                 >
//                   <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500' />
//                   <div className='space-y-1'>
//                     <p className='text-sm font-medium leading-none'>
//                       {notification.title}
//                     </p>
//                     <p className='text-sm text-muted-foreground'>
//                       {notification.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button className='w-full'>
//               <Check /> Mark all as read
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// };
export const LogInSection = () => {
  return (
    <div className='bg-[#EAEBFA] flex items-center justify-between w-full min-h-screen'>
      <div className='w-1/2'>fefew</div>
      <div className='w-1/2 flex items-center justify-center'>
        <h1 className='font-semibold text-2xl'>Нэвтрэх</h1>
      </div>
    </div>
  );
};
