
import React from 'react';
import { Task } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete, onEdit }) => {
  return (
    <div className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-700/50 group">
      <div className="flex-shrink-0 mr-4">
        <button
          onClick={() => onToggleComplete(task)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-indigo-500 border-indigo-500'
              : 'border-gray-500 hover:border-indigo-500'
          }`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex-grow">
        <p className={`text-lg transition-colors ${
          task.completed ? 'text-gray-500 line-through' : 'text-gray-100'
        }`}>
          {task.title}
        </p>
      </div>

      <div className="flex-shrink-0 flex items-center space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="Edit task"
        >
          <EditIcon />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
          aria-label="Delete task"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
