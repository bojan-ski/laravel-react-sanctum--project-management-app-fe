import { useEffect, useRef, type JSX } from 'react';
import type { Message } from '../../../types/message';
import NoDataMessage from '../../global/NoDataMessage';
import TaskChatMessage from './TaskChatMessage';

type TaskChatMessagesProps = {
    isLoading: boolean;
    messagesCount: number;
    messages: Message[];
};

function TaskChatMessages({
    isLoading,
    messagesCount,
    messages
}: TaskChatMessagesProps): JSX.Element {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [ messages ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='border rounded-lg bg-gray-50 mb-4'>
            <div className='h-96 overflow-y-auto p-4 space-y-3'>
                {messagesCount == 0 ? (
                    <NoDataMessage message='No messages yet' />
                ) : (
                    <>
                        {messages.map((message: Message) => (
                            <TaskChatMessage
                                key={message.id}
                                isCurrentUser={message.is_author}
                                isLoading={isLoading}
                                message={message}
                            />
                        ))}

                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>
        </div>
    );
}

export default TaskChatMessages;