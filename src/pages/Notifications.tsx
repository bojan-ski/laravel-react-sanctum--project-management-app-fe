import { useEffect, type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { getUserNotifications } from '../features/regularUser/notificationSlice';
import type { Notification, NotificationState } from '../types/types';
import Loading from '../components/global/Loading';
import NoDataMessage from '../components/global/NoDataMessage';
import NotificationItem from '../components/notification/NotificationItem';

function Notifications(): JSX.Element {
  const { isLoading, notifications, unreadCount } = useAppSelector<NotificationState>(state => state.notifications);
  const dispatch = useAppDispatch();

  useEffect((): void => {
    console.log('useEffect - Notifications');
    dispatch(getUserNotifications(false));
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className='notifications-page my-10'>
      {notifications.length == 0 ? (
        <NoDataMessage message="You have no notifications" />
      ) : (
        <>
          <h2 className='text-center font-semibold text-xl mb-5'>
            You have {unreadCount} unread message{unreadCount > 1 && 's'}
          </h2>

          <section className="divide-y mb-5">
            {notifications.map((notification: Notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </section>
        </>
      )}
    </div>
  );
}

export default Notifications;