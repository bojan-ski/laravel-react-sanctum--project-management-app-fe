import { type JSX } from 'react';
import { useRouteError } from 'react-router';
import ErrorMessage from '../components/global/ErrorMessage';

function Error(): JSX.Element {
  const error: any = useRouteError();
  const errorMsg: string = error.error.message ?? error.statusText;

  return (
    <div className='h-screen flex items-center justify-center'>
      <ErrorMessage error={errorMsg} />
    </div>
  );
}

export default Error;