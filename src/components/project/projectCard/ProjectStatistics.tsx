import { type JSX } from 'react';
import { Files, Users } from 'lucide-react';

type ProjectStatisticsProps = {
  totalMembers: number;
  completedTasks: number;
  totalTasks: number;
};

function ProjectStatistics({
  totalMembers,
  completedTasks,
  totalTasks,
}: ProjectStatisticsProps): JSX.Element {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 text-sm">
        <Users className="h-4 w-4 text-gray-500" />
        <span className="text-gray-600">
          {totalMembers} members
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Files className="h-4 w-4 text-gray-500" />
        <span className="text-gray-600">
          {completedTasks}/{totalTasks} tasks
        </span>
      </div>
    </div>
  );
}

export default ProjectStatistics;