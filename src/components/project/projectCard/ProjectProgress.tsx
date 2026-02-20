import { type JSX } from 'react';

function ProjectProgress({ completionPercentage }: { completionPercentage: number; }): JSX.Element {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
        <span>Progress</span>
        <span>{completionPercentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gray-800 h-2 rounded-full transition-all"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProjectProgress;