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
  discount?: number;
  image?: string;
}
