import { LucideIcon } from 'lucide-react';

export type Page = 'landing' | 'auth' | 'dashboard';
export type AdminView = 'stats' | 'users' | 'settings';

export interface User {
  name: string;
  initials: string;
  email: string;
  role: 'student' | 'faculty' | 'staff' | 'admin';
  lastActive?: string;
}

export interface FileItem {
  id: number;
  name:string;
  size: string;
  uploaded: string;
  owner: string;
  shared: number;
  status: 'encrypted';
  summary?: string;
  keywords?: string[];
  category?: string;
}

export interface Activity {
  action: string;
  file: string;
  user: string;
  time: string;
  type: 'upload' | 'share' | 'download' | 'access' | 'delete';
}

export interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

export interface Workspace {
  id: number;
  name: string;
  description: string;
  members: { name: string; initials: string; avatarColor: string; }[];
  fileCount: number;
  memberCount: number;
  icon: LucideIcon;
}