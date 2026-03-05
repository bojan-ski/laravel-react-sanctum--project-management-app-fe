import { useEffect } from 'react';
import { useAppDispatch } from './useRedux';
import echo from '../lib/echo';
import { addMessage, removeMessage } from '../features/regularUser/messageSlice';
import type { Message } from '../types/message';

type RealtimeMessagesProps = {
    currentUserId: number | null;
    taskId: number;
};

export function useRealtimeMessages({
    currentUserId,
    taskId,
}: RealtimeMessagesProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!currentUserId || !taskId) return;

        const channel = echo
            .join(`task.${taskId}`)
            .listen('.message.sent', (data: Message) => {
                dispatch(addMessage(data));
            })
            .listen('.message.deleted', (data: { message_id: number; }) => {
                dispatch(removeMessage(data));
            });
        return () => {
            echo.leave(`task.${taskId}`);
        };
    }, [ currentUserId, taskId, dispatch ]);
}