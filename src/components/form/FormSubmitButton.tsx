import { type JSX } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type FormSubmitButtonProps = {
    loading?:boolean
    btnCss: string;
    btnLabel: string;
};

function FormSubmitButton({ loading, btnCss, btnLabel }: FormSubmitButtonProps): JSX.Element {
    const { pending } = useFormStatus();   

    return (
        <Button
            type="submit"
            className={btnCss}
            disabled={pending || loading}
        >
            {pending || loading ? 'Processing...' : btnLabel}
        </Button>
    );
}

export default FormSubmitButton;
