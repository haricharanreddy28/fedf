import { User, LegalRight, SupportService, CaseNote } from '../types';

const STORAGE_KEYS = {
  USERS: 'dv_app_users',
  CURRENT_USER: 'dv_app_current_user',
  LEGAL_RIGHTS: 'dv_app_legal_rights',
  SUPPORT_SERVICES: 'dv_app_support_services',
  CASE_NOTES: 'dv_app_case_notes',
  CHAT_MESSAGES: 'dv_app_chat_messages',
  THEME: 'dv_app_theme',
};

// User Management
export const getUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id || u.email === user.email);
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const addUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const deleteUser = (userId: string): void => {
  const users = getUsers();
  const filtered = users.filter(u => u.id !== userId);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
};

// Current User (Session)
export const getCurrentUser = (): User | null => {
  const data = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

// Legal Rights
export const getLegalRights = (): LegalRight[] => {
  const data = localStorage.getItem(STORAGE_KEYS.LEGAL_RIGHTS);
  return data ? JSON.parse(data) : [];
};

export const saveLegalRight = (right: LegalRight): void => {
  const rights = getLegalRights();
  const existingIndex = rights.findIndex(r => r.id === right.id);
  if (existingIndex >= 0) {
    rights[existingIndex] = right;
  } else {
    rights.push(right);
  }
  localStorage.setItem(STORAGE_KEYS.LEGAL_RIGHTS, JSON.stringify(rights));
};

export const deleteLegalRight = (id: string): void => {
  const rights = getLegalRights();
  const filtered = rights.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.LEGAL_RIGHTS, JSON.stringify(filtered));
};

// Support Services
export const getSupportServices = (): SupportService[] => {
  const data = localStorage.getItem(STORAGE_KEYS.SUPPORT_SERVICES);
  return data ? JSON.parse(data) : [];
};

export const saveSupportService = (service: SupportService): void => {
  const services = getSupportServices();
  const existingIndex = services.findIndex(s => s.id === service.id);
  if (existingIndex >= 0) {
    services[existingIndex] = service;
  } else {
    services.push(service);
  }
  localStorage.setItem(STORAGE_KEYS.SUPPORT_SERVICES, JSON.stringify(services));
};

export const deleteSupportService = (id: string): void => {
  const services = getSupportServices();
  const filtered = services.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.SUPPORT_SERVICES, JSON.stringify(filtered));
};

// Case Notes
export const getCaseNotes = (): CaseNote[] => {
  const data = localStorage.getItem(STORAGE_KEYS.CASE_NOTES);
  return data ? JSON.parse(data) : [];
};

export const saveCaseNote = (note: CaseNote): void => {
  const notes = getCaseNotes();
  const existingIndex = notes.findIndex(n => n.id === note.id);
  if (existingIndex >= 0) {
    notes[existingIndex] = note;
  } else {
    notes.push(note);
  }
  localStorage.setItem(STORAGE_KEYS.CASE_NOTES, JSON.stringify(notes));
};

export const deleteCaseNote = (id: string): void => {
  const notes = getCaseNotes();
  const filtered = notes.filter(n => n.id !== id);
  localStorage.setItem(STORAGE_KEYS.CASE_NOTES, JSON.stringify(filtered));
};

// Theme
export const getTheme = (): 'light' | 'dark' => {
  const theme = localStorage.getItem(STORAGE_KEYS.THEME);
  return (theme as 'light' | 'dark') || 'light';
};

export const setTheme = (theme: 'light' | 'dark'): void => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};

// Clear all session data (safety feature)
export const clearSessionData = (): void => {
  sessionStorage.clear();
};

// Clear all data (emergency)
export const clearAllData = (): void => {
  localStorage.clear();
  sessionStorage.clear();
};

// Initialize default data
export const initializeDefaultData = (): void => {
  // Initialize default legal rights if empty
  if (getLegalRights().length === 0) {
    const defaultRights: LegalRight[] = [
      {
        id: '1',
        title: 'Right to Protection',
        description: 'You have the right to seek protection orders and legal assistance.',
        category: 'Protection',
        updatedAt: new Date().toISOString(),
        updatedBy: 'System',
      },
      {
        id: '2',
        title: 'Right to Privacy',
        description: 'Your personal information and case details are confidential.',
        category: 'Privacy',
        updatedAt: new Date().toISOString(),
        updatedBy: 'System',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.LEGAL_RIGHTS, JSON.stringify(defaultRights));
  }

  // Initialize default support services if empty
  if (getSupportServices().length === 0) {
    const defaultServices: SupportService[] = [
      {
        id: '1',
        name: 'Emergency Helpline',
        description: '24/7 emergency support and crisis intervention',
        contact: '1800-HELP-NOW',
        location: 'National',
        category: 'Emergency',
      },
      {
        id: '2',
        name: 'Counseling Services',
        description: 'Professional counseling and therapy services',
        contact: '1800-COUNSEL',
        location: 'Multiple Locations',
        category: 'Counseling',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.SUPPORT_SERVICES, JSON.stringify(defaultServices));
  }

  // Initialize default admin user if no users exist
  if (getUsers().length === 0) {
    const adminUser: User = {
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@safeplace.com',
      password: 'admin123', // In production, this should be hashed
      role: 'admin',
      createdAt: new Date().toISOString(),
    };
    addUser(adminUser);
  }
};

