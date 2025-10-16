import { type FormEvent, type JSX } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { logoutUser } from '../../../features/user/userSlice';
import FormWrapper from '../../form/FormWrapper';
import FormSubmitButton from '../../form/FormSubmitButton';
import toast from 'react-hot-toast';

function LogoutOption(): JSX.Element {
  const { isLoading } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (confirm('Are you sure?')) {
      const response = await dispatch(logoutUser());

      if (response.meta.requestStatus == 'fulfilled') {
        toast.success(response?.payload.message);

        navigate('/');
      }

      if (response.meta.requestStatus == 'rejected') {
        toast.error(response.payload.random || response?.meta.requestStatus);
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