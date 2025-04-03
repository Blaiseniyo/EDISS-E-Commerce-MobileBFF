type Customer = {
  id?: number; // Optional for creation
  userId: string;
  name: string;
  phone: string;
  address: string;
  address2?: string | null; // Optional
  city: string;
  state: string;
  zipcode: string;
  createdAt?: Date; // Optional for creation
  updatedAt?: Date; // Optional for creation
};

export default Customer;
