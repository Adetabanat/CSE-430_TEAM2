//Interfaces
export enum AccountType {
    Basic = "BASIC",
    Seller = "SELLER",
    Admin = "ADMIN"
}

export interface Product {
    id: number
    name: string
    description: string | null
    price: number
    image: string
    userId: number
    categoryId: number
    reviews: Review[]
    createdAt: Date
    updatedAt: Date
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  userId: number;
  productId: number;
  createdAt: Date;
}

export interface User {
  id: number    
  name: string
  email: string
  password: string
  accountType: AccountType
  about_me: string | null
  products: Product[]   
  reviews: Review[]    
  createdAt: Date
  updatedAt: Date
}