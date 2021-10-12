export interface JobData {
  title: string;
  description: string;
  location: string;
  hour: string;
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
