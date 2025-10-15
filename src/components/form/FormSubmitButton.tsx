import { type JSX } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type FormSubmitButtonProps = {
    btnCss: string;
    btnLabel: string;
};

function FormSubmitButton({ btnCss, btnLabel }: FormSubmitButtonProps): JSX.Element {
    const { pending } = useFormStatus();   

    return (
        <Button
            type="submit"
            className={btnCss}
            disabled={pending}
        >
            {pending ? 'Processing...' : btnLabel}
        </Button>
    );
}

export default FormSubmitButton;
