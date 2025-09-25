// User model for authentication
export type User = {
  id: string;
  email: string;
  password: string; // hashed
  name?: string;
  image?: string;
  createdAt: Date;
  plan?: string; // Stripe subscription plan
};
