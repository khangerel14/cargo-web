export type Product = {
  _id: string;
  name: string;
  phoneNumber: string;
  trackingCode: string;
  status: string;
  pickupType: string;
  price: number;
  user: {
    id: string;
    name: string;
    phoneNumber: string;
  };
  createdAt: string;
  updatedAt: string;
};
