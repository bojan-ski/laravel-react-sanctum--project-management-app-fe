import { type FormEvent, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppSelector } from '../../../hooks/useRedux';
import { useThunk } from '../../../hooks/useThunk';
import { logoutUser } from '../../../features/user/userSlice';
import type { AuthState } from '../../../types/auth';
import FormWrapper from '../../form/FormWrapper';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

function LogoutOption(): JSX.Element {
  const { isLoading } = useAppSelector<AuthState>(state => state.user);
  const { run } = useThunk(logoutUser);
  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (confirm('Are you sure?')) {
      const thunkCall = await run(undefined);

      if (thunkCall.ok) {
        toast.success(thunkCall.data.message);

        navigate('/');
      } else {
        toast.error(thunkCall.error.random || "Logout Error");
      }
    }
  };

  return (
    <FormWrapper
      onSubmit={handleSubmit}
    >
      <button
        disabled={isLoading}
        className='flex items-center gap-2 capitalize text-sm border rounded-sm py-1.5 px-3 cursor-pointer text-white bg-red-900 hover:bg-red-700 transition'>
        <span className='hidden md:block'>Logout</span>
        <LogOut className='h-5 w-5' />
      </button>
    </FormWrapper>
  );
}

export default LogoutOption;