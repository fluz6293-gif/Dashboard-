
export enum PaymentMethod {
  PIX = 'PIX',
  CARD = 'CARTÃO',
}

export enum OrderStatus {
  CONFIRMED = 'CONFIRMADO',
  PENDING = 'PENDENTE',
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  time: string;
  amount: number;
  shippingFee: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  items: OrderItem[];
  type: 'ENTREGA' | 'RETIRADA';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Hambúrguer' | 'Pastel' | 'Pizza' | 'Açaí' | 'Bebida' | 'Pratos';
  imageUrl: string;
}

export interface Stats {
  totalOrders: number;
  orderGrowth: number;
  totalRevenue: number;
}
