import type { JSX } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormImageInputProps = {
    label?: string;
    name: string;
    onMutate?: any;
    required?: boolean;
    divCss?: string,
    labelCss?: string,
    inputCss?: string,
    error?: string,
};

function FormImageInput({
    name,
    label,
    onMutate,
    required,
    divCss,
    labelCss,
    inputCss,
    error,
}: FormImageInputProps): JSX.Element {
    return (
        <div className={divCss}>
            {label && (
                <Label
                    htmlFor={name}
                    className={`block capitalize text-xs sm:text-sm font-semibold mb-2 ${labelCss}`}
                >
                    {label}:
                </Label>
            )}

            <Input
                id={name}
                name={name}
                type='file'
                accept='image/*'
                onChange={onMutate}
                required={required}
                className={`w-full rounded-md ${inputCss}`}
            />

            {error && <p className="text-red-500 text-xs sm:text-sm mt-1">
                {error}
            </p>}
        </div>
    );
}

export default FormImageInput;