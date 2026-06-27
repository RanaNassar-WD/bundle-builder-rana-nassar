export interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export interface CameraOption {
  id: string;
  name: string;
  description: string;
  priceBefore: number;
  priceAfter?: number;
  options?: {
    image: string;
    text: string;
  }[];

  discount?: number;
  image?: string;
}
export interface CameraState {
  color: string;
  quantity: number;
  selected: boolean;
}

export interface Plan {
  id: string;
  name: string;
  priceBefore: string;
  priceAfter: string;
  icon: React.ReactNode;
  shippingIcon: React.ReactNode;
  shippingText: string;
  shippingPriceBefore: string;
  shippingPriceAfter: string;

}
export interface SensorOption {
  id: string;
  name: string;
  description: string;
  priceBefore: number;
  priceAfter?: number;
  options?: {
    image: string;
    text: string;
  }[];
  discount?: number;
  image?: string;
}

export interface SensorState {
  color: string;
  quantity: number;
  selected: boolean;
}
