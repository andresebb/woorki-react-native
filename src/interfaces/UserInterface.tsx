export interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  emailVerified: boolean;
  isOnline?: boolean;
  createdAt?: any;
  uid: string | undefined;
}
