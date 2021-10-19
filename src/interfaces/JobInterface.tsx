import {User} from './UserInterface';

export interface JobData {
  title: string;
  jobPlace: string;
  category: string;
  description: string;
  address: string;
  city: string;
  hour: number;
  coordinate: coordinate;
  image: string;
  id: string | number;
  createdAt: any;
  user: User;
}

interface coordinate {
  latitude: number;
  longitude: number;
}
