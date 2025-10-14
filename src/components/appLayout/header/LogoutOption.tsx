import { type FormEvent, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { logout } from '../../../services/auth';
import { useAppDispatch } from '../../../hooks/useRedux';
import { logoutUser } from '../../../features/user/userSlice';
import FormWrapper from '../../form/FormWrapper';
import FormSubmitButton from '../../form/FormSubmitButton';
import toast from 'react-hot-toast';

function LogoutOption(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (confirm('Are you sure?')) {
      try {
        // api call
        const response = await logout();

        // userSlice call
        dispatch(logoutUser());

        // display toast message
        toast.success(response?.message);

        // navigate user
        navigate('/');
      } catch (error: any) {
        toast.error('Error!');
      }
    }
  };

  return (
    <FormWrapper
      onSubmit={handleSubmit}
    >
      {/* submit */}
      <FormSubmitButton
        btnCss='text-sm border rounded-sm py-1.5 px-4 mx-2 cursor-pointer text-white bg-red-900 hover:bg-red-700 transition'
        btnLabel='Logout'
      />
    </FormWrapper>
  );
}

export default LogoutOption;