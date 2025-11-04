import type { FileItem, Activity, Notification, Workspace, User } from './types';
import { Folder, Code, Briefcase, Palette } from 'lucide-react';

export const files: FileItem[] = [
  { 
    id: 1, 
    name: 'Computer Networks Assignment.pdf', 
    size: '2.4 MB', 
    uploaded: '2025-11-02', 
    owner: 'Dr. Adebayo', 
    shared: 5, 
    status: 'encrypted',
    summary: 'A detailed assignment covering the OSI model, TCP/IP protocols, and subnetting. It requires students to analyze network packets and design a small office network.',
    keywords: ['Networking', 'OSI Model', 'TCP/IP', 'Subnetting'],
    category: 'Assignment'
  },
  { 
    id: 2, 
    name: 'Research Paper Draft.docx', 
    size: '1.8 MB', 
    uploaded: '2025-11-01', 
    owner: 'You', 
    shared: 2, 
    status: 'encrypted',
    summary: 'A draft exploring the ethical implications of bias in machine learning algorithms. It discusses fairness, accountability, and transparency in AI systems.',
    keywords: ['AI', 'Ethics', 'Machine Learning', 'Bias'],
    category: 'Research Paper'
  },
  { 
    id: 3, 
    name: 'Database Design Slides.pptx', 
    size: '5.2 MB', 
    uploaded: '2025-10-28', 
    owner: 'Prof. Okoro', 
    shared: 15, 
    status: 'encrypted',
    summary: 'Lecture slides on relational database design principles, focusing on normalization (1NF, 2NF, 3NF), and entity-relationship diagrams (ERDs).',
    keywords: ['Database', 'SQL', 'Normalization', 'ERD'],
    category: 'Lecture Slides'
  },
  { 
    id: 4, 
    name: 'Project Documentation.pdf', 
    size: '3.1 MB', 
    uploaded: '2025-10-25', 
    owner: 'You', 
    shared: 1, 
    status: 'encrypted',
    summary: 'Comprehensive documentation for the "CampusConnect" software project, outlining system architecture, API endpoints, and user flow diagrams.',
    keywords: ['Project', 'Software', 'Documentation', 'API'],
    category: 'Documentation'
  },
];

export const activities: Activity[] = [
  { action: 'File uploaded', file: 'Computer Networks Assignment.pdf', user: 'You', time: '2 hours ago', type: 'upload' },
  { action: 'File shared', file: 'Research Paper Draft.docx', user: 'Dr. Musa', time: '5 hours ago', type: 'share' },
  { action: 'File downloaded', file: 'Database Design Slides.pptx', user: 'You', time: '1 day ago', type: 'download' },
  { action: 'Access granted', file: 'Project Documentation.pdf', user: 'Admin', time: '2 days ago', type: 'access' },
];

export const notifications: Notification[] = [
  { id: 1, message: 'New file shared with you', time: '10 min ago', read: false },
  { id: 2, message: 'Your file was downloaded', time: '1 hour ago', read: false },
  { id: 3, message: 'Security update available', time: '3 hours ago', read: true },
];

export const workspaces: Workspace[] = [
    {
        id: 1,
        name: 'CS101: Intro to Programming',
        description: 'Shared materials and assignments for the introductory computer science course.',
        members: [
            { name: 'Grace Hopper', initials: 'GH', avatarColor: 'bg-blue-500' },
            { name: 'Alan Turing', initials: 'AT', avatarColor: 'bg-green-500' },
            { name: 'Ada Lovelace', initials: 'AL', avatarColor: 'bg-purple-500' },
        ],
        fileCount: 42,
        memberCount: 150,
        icon: Code,
    },
    {
        id: 2,
        name: 'Final Year Project Group',
        description: 'Workspace for the "CampusConnect" software project group.',
        members: [
            { name: 'You', initials: 'GH', avatarColor: 'bg-cyan-500' },
            { name: 'Dr. Musa', initials: 'DM', avatarColor: 'bg-indigo-500' },
            { name: 'Prof. Okoro', initials: 'PO', avatarColor: 'bg-pink-500' },
        ],
        fileCount: 15,
        memberCount: 4,
        icon: Folder,
    },
    {
        id: 3,
        name: 'Mechanical Engineering Dept.',
        description: 'Department-wide resources, announcements, and research papers.',
        members: [
            { name: 'Dr. Adebayo', initials: 'DA', avatarColor: 'bg-orange-500' },
        ],
        fileCount: 128,
        memberCount: 35,
        icon: Briefcase,
    },
    {
        id: 4,
        name: 'History of Art Study Group',
        description: 'A collaborative space for sharing notes and discussing readings.',
        members: [
            { name: 'User 1', initials: 'U1', avatarColor: 'bg-red-500' },
            { name: 'User 2', initials: 'U2', avatarColor: 'bg-yellow-500' },
        ],
        fileCount: 76,
        memberCount: 8,
        icon: Palette,
    },
];

export const allUsers: User[] = [
    { name: 'Grace Hopper', initials: 'GH', email: 'grace@university.edu.ng', role: 'student', lastActive: '2 hours ago' },
    { name: 'Dr. Musa', initials: 'DM', email: 'musa@university.edu.ng', role: 'faculty', lastActive: '5 hours ago' },
    { name: 'Prof. Okoro', initials: 'PO', email: 'okoro@university.edu.ng', role: 'faculty', lastActive: '1 day ago' },
    { name: 'Dr. Adebayo', initials: 'DA', email: 'adebayo@university.edu.ng', role: 'faculty', lastActive: '3 days ago' },
    { name: 'Alan Turing', initials: 'AT', email: 'alan@university.edu.ng', role: 'student', lastActive: '1 week ago' },
    { name: 'Ada Lovelace', initials: 'AL', email: 'ada@university.edu.ng', role: 'student', lastActive: '2 weeks ago' },
    { name: 'Admin User', initials: 'AU', email: 'admin@university.edu.ng', role: 'admin', lastActive: 'Just now' },
];