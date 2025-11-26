import { createContext, use, type ReactNode } from "react";
import { useRevalidator } from "react-router";

type PageRefreshContextProps = {
    pageRefresh: () => void;
};

export const PageRefreshContext = createContext<PageRefreshContextProps | null>(null);

export function PageRefreshProvider({ children }: { children: ReactNode; }) {
    const revalidator = useRevalidator();
    const pageRefresh = () => revalidator.revalidate();

    return (
        <PageRefreshContext.Provider
            value={{
                pageRefresh
            }}
        >
            {children}
        </PageRefreshContext.Provider>
    );
}

export function usePageRefresh(): PageRefreshContextProps {
    const context = use(PageRefreshContext);

    if (!context) throw new Error("PageRefreshContext error");

    return context;
}