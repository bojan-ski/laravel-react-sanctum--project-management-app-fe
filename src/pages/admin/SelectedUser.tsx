import { type JSX } from 'react';
import { useLoaderData } from 'react-router';
import { getUser } from '../../services/admin';
import type { SelectedRegularUserDetailsResponse } from '../../types/admin';
import RegularUserData from '../../components/admin/userPage/RegularUserData';
import RegularUserStats from '../../components/admin/userPage/RegularUserStats';
import NoDataMessage from '../../components/global/NoDataMessage';
import ProjectsList from '../../components/project/ProjectsList';

export const loader = async ({ params }: { params: any; }): Promise<SelectedRegularUserDetailsResponse> => {
  const response: SelectedRegularUserDetailsResponse = await getUser(params.id);

  return response;
};

function SelectedUser(): JSX.Element {
  const { data } = useLoaderData();

  return (
    <div className="my-10 mx-auto">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-0 md:mb-4'>
        <RegularUserData user={data} />
        <RegularUserStats
          ownedProjectsCount={data.owned_projects_count}
          memberProjectsCount={data.member_projects_count}
          totalProjectsCount={data.total_projects}
        />
      </div>

      {data.recent_projects.length == 0 ? (
        <NoDataMessage message="There are no projects" />
      ) : (
        <ProjectsList projects={data.recent_projects} />
      )}
    </div>
  );
}

export default SelectedUser;