import { createContext, use, type ReactNode } from "react";

type NotificationBellContextProps = {
    closeDropdown: () => void;
};

export const NotificationBellContext = createContext<NotificationBellContextProps | null>(null);

type NotificationBellProviderProps = {
    children: ReactNode;
    closeDropdown: () => void;
};

export function NotificationBellProvider({ children, closeDropdown }: NotificationBellProviderProps) {
    return (
        <NotificationBellContext.Provider
            value={{
                closeDropdown
            }}
        >
            {children}
        </NotificationBellContext.Provider>
    );
}

export function useNotificationBell(): NotificationBellContextProps {
    const context = use(NotificationBellContext);

    if (!context) throw new Error("NotificationBellContext error");

    return context;
}