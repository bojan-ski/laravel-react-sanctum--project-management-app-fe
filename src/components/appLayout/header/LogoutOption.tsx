import { type FormEvent, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppSelector } from '../../../hooks/useRedux';
import { useThunk } from '../../../hooks/useThunk';
import { logoutUser } from '../../../features/user/userSlice';
import type { UserState } from '../../../types/types';
import FormWrapper from '../../form/FormWrapper';
import FormSubmitButton from '../../form/FormSubmitButton';
import toast from 'react-hot-toast';

function LogoutOption(): JSX.Element {
  const { isLoading } = useAppSelector<UserState>(state => state.user);
  const { run } = useThunk(logoutUser);
  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (confirm('Are you sure?')) {
      // run dispatch call
      const thunkCall = await run(undefined);      

      // dispatch response
      if (thunkCall.ok) {
        toast.success(thunkCall.data.message);

        navigate('/');
      } else {
        toast.error(thunkCall.error.random);
      }
    }
  };

  return (
    <FormWrapper
      onSubmit={handleSubmit}
    >
      {/* submit */}
      <FormSubmitButton
        loading={isLoading}
        btnCss='text-sm border rounded-sm py-1.5 px-4 mx-2 cursor-pointer text-white bg-red-900 hover:bg-red-700 transition'
        btnLabel='Logout'
      />
    </FormWrapper>
  );
}

export default LogoutOption;