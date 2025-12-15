// ../DB/UserProfiles.ts
import bcrypt from "bcryptjs";

export type User = { name: string; username: string; email: string; password: string };

const USERS_KEY = "users";

// Read users from localStorage
export const readUsers = (): User[] => {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Write users to localStorage
export const writeUsers = (users: User[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Check if username exists
export const usernameExists = (username: string) => {
  return readUsers().some(u => u.username === username);
};

// Add user with hashed password
export const addUser = async (user: User) => {
  const users = readUsers();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  users.push({ ...user, password: hashedPassword });
  writeUsers(users);
};

// Find user by email (and optional password)
export const findUser = async (email: string, password?: string) => {
  const users = readUsers();
  const user = users.find(u => u.email === email);
  if (!user) return null;
  if (password) {
    const match = await bcrypt.compare(password, user.password);
    return match ? user : null;
  }
  return user;
};
