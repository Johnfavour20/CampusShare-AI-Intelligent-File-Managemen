import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { Page, User, FileItem, Activity, Notification, AdminView } from '../types';
import { files as initialFiles, activities as initialActivities, notifications as initialNotifications, allUsers } from '../constants';

type DashboardView = 'materials' | 'collaborations' | 'activity' | 'settings';

interface AppContextType {
  page: Page;
  setPage: (page: Page) => void;
  isAuthenticated: boolean;
  user: User | null;
  register: (userData: Omit<User, 'initials' | 'lastActive'>) => { success: boolean; message?: string };
  login: (credentials: { email: string }) => { success: boolean; message?: string };
  logout: () => void;
  files: FileItem[];
  deleteFile: (fileId: number) => void;
  downloadFile: (file: FileItem) => void;
  activities: Activity[];
  notifications: Notification[];
  markNotificationsAsRead: () => void;
  
  // AI File Analysis Flow
  isAnalyzing: boolean;
  analysisResult: { summary: string; keywords: string[]; suggestedName: string; category: string; } | null;
  fileForAnalysis: File | null;
  startFileUploadAnalysis: (file: File) => void;
  finalizeUpload: (file: File, aiData?: { name: string; summary: string; keywords: string[]; category: string; }) => void;
  cancelAnalysis: () => void;

  // AI Search Flow
  isSearching: boolean;
  aiSearchResponse: string | null;
  searchResults: FileItem[] | null;
  performAISearch: (query: string) => void;
  clearSearch: () => void;
  
  // Share File Flow
  fileToShare: FileItem | null;
  startShareFile: (file: FileItem) => void;
  cancelShareFile: () => void;
  confirmShareFile: (fileId: number, email: string) => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Dashboard Navigation
  dashboardView: DashboardView;
  setDashboardView: (view: DashboardView) => void;

  // Admin Dashboard Navigation
  adminView: AdminView;
  setAdminView: (view: AdminView) => void;

  // Mobile Menu
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<Page>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  
  // User Management State (simulates a user database)
  const [users, setUsers] = useState<User[]>(allUsers);

  // AI File Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ summary: string; keywords: string[]; suggestedName: string; category: string; } | null>(null);
  const [fileForAnalysis, setFileForAnalysis] = useState<File | null>(null);

  // AI Search State
  const [isSearching, setIsSearching] = useState(false);
  const [aiSearchResponse, setAiSearchResponse] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<FileItem[] | null>(null);
  
  // Share File State
  const [fileToShare, setFileToShare] = useState<FileItem | null>(null);

  // Navigation State
  const [dashboardView, _setDashboardView] = useState<DashboardView>('materials');
  const [adminView, _setAdminView] = useState<AdminView>('stats');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme');
    return (storedTheme === 'light' || storedTheme === 'dark') ? storedTheme : 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const setDashboardView = (view: DashboardView) => {
    _setDashboardView(view);
    closeMobileMenu();
  };
  
  const setAdminView = (view: AdminView) => {
    _setAdminView(view);
    closeMobileMenu();
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  const register = (userData: Omit<User, 'initials' | 'lastActive'>): { success: boolean; message?: string } => {
    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
        return { success: false, message: 'An account with this email already exists.' };
    }

    if (userData.email.toLowerCase() === 'admin@university.edu.ng') {
        return { success: false, message: 'This email is reserved.' };
    }

    const newUser: User = {
        ...userData,
        initials: getInitials(userData.name),
        lastActive: 'Just now',
    };

    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    setIsAuthenticated(true);
    setPage('dashboard');
    return { success: true };
  };

  const login = (credentials: { email: string }): { success: boolean; message?: string } => {
    const formattedEmail = credentials.email.toLowerCase();

    if (formattedEmail === 'admin@university.edu.ng') {
        const adminUser = users.find(u => u.role === 'admin' && u.email === 'admin@university.edu.ng');
        if (adminUser) {
            setUser(adminUser);
            setIsAuthenticated(true);
            setPage('dashboard');
            return { success: true };
        }
        return { success: false, message: 'Admin account not found.' };
    }

    const existingUser = users.find(u => u.email.toLowerCase() === formattedEmail);
    
    if (existingUser && existingUser.role !== 'admin') {
      setUser(existingUser);
      setIsAuthenticated(true);
      setPage('dashboard');
      return { success: true };
    }

    return { success: false, message: 'No account found with this email. Please register.' };
  };


  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    closeMobileMenu();
    setPage('landing');
    _setDashboardView('materials');
    _setAdminView('stats');
  };
  
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const startFileUploadAnalysis = (file: File) => {
    setFileForAnalysis(file);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Mock Gemini API call
    setTimeout(() => {
        const mockSummary = `This document provides a comprehensive overview of machine learning concepts, detailing the differences between supervised, unsupervised, and reinforcement learning, along with practical examples.`;
        const mockKeywords = ["Machine Learning", "Supervised Learning", "AI", "Data Science"];
        const fileExtension = file.name.split('.').pop();
        const mockSuggestedName = `Machine_Learning_Overview_${formatDate(new Date())}.${fileExtension}`;
        const mockCategory = "Lecture Notes";

        setAnalysisResult({
            summary: mockSummary,
            keywords: mockKeywords,
            suggestedName: mockSuggestedName,
            category: mockCategory,
        });
        setIsAnalyzing(false);
    }, 2500);
  };

  const cancelAnalysis = () => {
    setFileForAnalysis(null);
    setIsAnalyzing(false);
    setAnalysisResult(null);
  }

  const finalizeUpload = (file: File, aiData?: { name: string; summary: string; keywords: string[]; category: string; }) => {
    const newFile: FileItem = {
      id: Date.now(),
      name: aiData?.name || file.name,
      size: formatBytes(file.size),
      uploaded: formatDate(new Date()),
      owner: 'You',
      shared: 0,
      status: 'encrypted',
      summary: aiData?.summary,
      keywords: aiData?.keywords,
      category: aiData?.category,
      sharedWith: [],
    };
    
    const newActivity: Activity = {
      action: 'File uploaded',
      file: newFile.name,
      user: 'You',
      time: 'Just now',
      type: 'upload',
    };

    const newNotification: Notification = {
      id: Date.now(),
      message: `Successfully uploaded "${newFile.name}"`,
      time: 'Just now',
      read: false,
    };

    setFiles(prev => [newFile, ...prev]);
    setActivities(prev => [newActivity, ...prev]);
    setNotifications(prev => [newNotification, ...prev]);

    cancelAnalysis();
  };


  const deleteFile = (fileId: number) => {
    const fileToDelete = files.find(f => f.id === fileId);
    if (!fileToDelete) return;
    
    const newActivity: Activity = {
        action: 'File deleted',
        file: fileToDelete.name,
        user: 'You',
        time: 'Just now',
        type: 'delete',
    }

    setFiles(prev => prev.filter(f => f.id !== fileId));
    setActivities(prev => [newActivity, ...prev]);
  }
  
  const downloadFile = (file: FileItem) => {
    const content = `This is a dummy file representing "${file.name}".\n\nSummary:\n${file.summary || 'N/A'}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name.replace(/\.[^/.]+$/, "") + ".txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const newActivity: Activity = {
        action: 'File downloaded',
        file: file.name,
        user: 'You',
        time: 'Just now',
        type: 'download',
    };
    setActivities(prev => [newActivity, ...prev]);
  };
  
  const startShareFile = (file: FileItem) => {
    setFileToShare(file);
  };

  const cancelShareFile = () => {
      setFileToShare(null);
  };

  const confirmShareFile = (fileId: number, email: string) => {
      const fileToUpdate = files.find(f => f.id === fileId);
      if (!fileToUpdate) return;

      // Update the file's shared count and sharedWith list
      setFiles(prevFiles => prevFiles.map(f => 
          f.id === fileId 
          ? { 
              ...f, 
              shared: f.shared + 1,
              sharedWith: [...(f.sharedWith || []), email.toLowerCase()]
            } 
          : f
      ));

      // Create a new activity log entry
      const newActivity: Activity = {
          action: `File shared with ${email}`,
          file: fileToUpdate.name,
          user: 'You',
          time: 'Just now',
          type: 'share',
      };
      setActivities(prev => [newActivity, ...prev]);

      const notificationsToAdd: Notification[] = [];
      
      // Notification for the person sharing
      const sharerNotification: Notification = {
          id: Date.now(),
          message: `You shared "${fileToUpdate.name}" with ${email}.`,
          time: 'Just now',
          read: false,
          recipient: user?.email,
      };
      notificationsToAdd.push(sharerNotification);

      // Notification for the recipient, regardless of whether they are a registered user yet.
      // They will see this notification upon their next login or after signing up.
      const recipientNotification: Notification = {
          id: Date.now() + 1, // ensure unique key
          message: `${user?.name} shared "${fileToUpdate.name}" with you.`,
          time: 'Just now',
          read: false,
          recipient: email.toLowerCase(),
      };
      notificationsToAdd.push(recipientNotification);
      
      setNotifications(prev => [...notificationsToAdd, ...prev]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => 
        (!n.recipient || n.recipient === user?.email) ? { ...n, read: true } : n
    ));
  }

  const performAISearch = (query: string) => {
    setIsSearching(true);
    setAiSearchResponse(null);
    setSearchResults(null);
    
    // First, get only the files visible to the current user
    const userVisibleFiles = files.filter(file => file.owner === 'You' || file.sharedWith?.includes(user?.email ?? ''));

    // Mock Gemini API call for semantic search
    setTimeout(() => {
      const queryKeywords = query.toLowerCase().split(' ').filter(kw => kw.length > 2);
      
      // Search only within the user's visible files
      const foundFiles = userVisibleFiles.filter(file => {
        const fileContent = `${file.summary?.toLowerCase()} ${file.keywords?.map(k => k.toLowerCase()).join(' ')} ${file.name.toLowerCase()}`;
        return queryKeywords.some(kw => fileContent.includes(kw));
      });

      let responseText = `I couldn't find any documents related to "${query}". Try a different search term.`;
      if (foundFiles.length > 0) {
          responseText = `I found ${foundFiles.length} document${foundFiles.length > 1 ? 's' : ''} related to your query for "${query}".`;
      }

      setAiSearchResponse(responseText);
      setSearchResults(foundFiles);
      setIsSearching(false);

    }, 1500);
  }

  const clearSearch = () => {
    setAiSearchResponse(null);
    setSearchResults(null);
  }


  return (
    <AppContext.Provider value={{ 
        page, setPage, 
        isAuthenticated, user, login, logout, register,
        files, deleteFile, downloadFile,
        activities,
        notifications, markNotificationsAsRead,
        isAnalyzing, analysisResult, fileForAnalysis,
        startFileUploadAnalysis, finalizeUpload, cancelAnalysis,
        isSearching, aiSearchResponse, searchResults, performAISearch, clearSearch,
        fileToShare, startShareFile, cancelShareFile, confirmShareFile,
        theme, toggleTheme,
        dashboardView, setDashboardView,
        adminView, setAdminView,
        isMobileMenuOpen, toggleMobileMenu, closeMobileMenu
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};