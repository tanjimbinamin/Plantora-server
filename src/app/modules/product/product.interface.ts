export interface TAvailability{
  quantity:number;
  status:"Available" | "stockOut"
}


export interface TProduct {
  category:string;
  title:string;
  price:number;
  description:string;
  image:string;
  availability:TAvailability;
  rating:string;
}