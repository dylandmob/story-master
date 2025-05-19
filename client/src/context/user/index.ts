import { createContext } from 'react';

export interface UserContextType {
  user: User | null;
  userError: string | null;
  getMe: () => Promise<void>;
  editMe: (name: string, imageUrl: string) => Promise<void>;
  deleteMe: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
