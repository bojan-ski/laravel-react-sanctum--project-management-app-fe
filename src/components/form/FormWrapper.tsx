import { type FormEvent, type JSX, type ReactNode } from "react";

type FormWrapperProps = {
    children: ReactNode;
    onSubmit: (e: FormEvent<Element>) => Promise<void>;
    formCss?: string;
};

function FormWrapper({ children, onSubmit, formCss }: FormWrapperProps): JSX.Element {
    return (
        <form
            onSubmit={onSubmit}
            className={formCss}
        >
            {children}
        </form>
    );
}

export default FormWrapper;
