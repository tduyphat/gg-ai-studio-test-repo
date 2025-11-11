
import React, { useState, useEffect, useCallback } from 'react';
import { Task } from './types';
import * as api from './services/api';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import Button from './components/Button';
import { PlusIcon } from './components/icons/PlusIcon';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedTasks = await api.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleOpenModal = (task: Task | null = null) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleSaveTask = async (title: string) => {
    try {
      if (taskToEdit) {
        const updatedTask = await api.updateTask(taskToEdit.id, { title });
        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
      } else {
        const newTask = await api.createTask(title);
        setTasks([newTask, ...tasks]);
      }
      handleCloseModal();
    } catch (err) {
      setError('Failed to save task.');
      console.error(err);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updatedTask = await api.updateTask(task.id, { completed: !task.completed });
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    } catch (err) {
      setError('Failed to update task status.');
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await api.deleteTask(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      setError('Failed to delete task.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Task Manager</h1>
            <p className="text-gray-400">A Simple CRUD App Interface</p>
          </div>
          <Button onClick={() => handleOpenModal()} variant="primary" className="flex items-center gap-2">
            <PlusIcon />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </header>

        <main>
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}
          {!isLoading && !error && (
            <TaskList 
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
              onEdit={(task) => handleOpenModal(task)}
            />
          )}
        </main>
      </div>
      
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default App;
