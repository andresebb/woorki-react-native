export interface JobData {
  title: string;
  jobPlace: string;
  category: string;
  description: string;
  location: string;
  city: string;
  address?: string;
  hour: number;
  email: string;
  phone: string;
  image: string;
  id: string | number;
  direction?: any;
  coordinate: coordinate;
}

interface coordinate {
  latitude: number;
  longitude: number;
}
