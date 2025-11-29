import { User, UserRole } from '../types';
import { getUsers, setCurrentUser, getCurrentUser } from './storage';

export const registerUser = (name: string, email: string, password: string, role: UserRole): { success: boolean; message: string } => {
  const users = getUsers();
  
  // Check for duplicate email
  if (users.some(u => u.email === email)) {
    return { success: false, message: 'Email already registered' };
  }

  // Validate password
  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters' };
  }

  // Create new user
  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    password, // In production, hash this
    role,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem('dv_app_users', JSON.stringify(users));

  return { success: true, message: 'Registration successful' };
};

export const loginUser = (email: string, password: string): { success: boolean; message: string; user?: User } => {
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return { success: false, message: 'User not found' };
  }

  if (user.password !== password) {
    return { success: false, message: 'Incorrect password' };
  }

  if (!user.role) {
    return { success: false, message: 'Account role not assigned' };
  }

  setCurrentUser(user);
  return { success: true, message: 'Login successful', user };
};

export const logoutUser = (): void => {
  setCurrentUser(null);
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const getCurrentUserRole = (): UserRole | null => {
  const user = getCurrentUser();
  return user ? user.role : null;
};

