
import { Task } from '../types';

let tasks: Task[] = [
  { id: 1, title: 'Set up the project structure', completed: true, createdAt: new Date(Date.now() - 86400000 * 2) },
  { id: 2, title: 'Build the React UI components', completed: true, createdAt: new Date(Date.now() - 86400000) },
  { id: 3, title: 'Create a mock API service', completed: false, createdAt: new Date() },
  { id: 4, title: 'Implement CRUD functionality', completed: false, createdAt: new Date() },
  { id: 5, title: 'Style the application with Tailwind CSS', completed: false, createdAt: new Date() },
];

let nextId = 6;

const simulateDelay = <T,>(data: T): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 500 + Math.random() * 500);
  });
};

export const getTasks = async (): Promise<Task[]> => {
  return simulateDelay([...tasks].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
};

export const createTask = async (title: string): Promise<Task> => {
  if (!title.trim()) {
    throw new Error('Task title cannot be empty.');
  }
  const newTask: Task = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  return simulateDelay(newTask);
};

export const updateTask = async (id: number, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task> => {
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    throw new Error('Task not found.');
  }
  tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
  return simulateDelay(tasks[taskIndex]);
};

export const deleteTask = async (id: number): Promise<{ success: boolean }> => {
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  if (tasks.length === initialLength) {
    throw new Error('Task not found.');
  }
  return simulateDelay({ success: true });
};
