import { type JSX } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type FormTextareaProps = {
    name: string;
    label?: string;
    value?: string;
    placeholder?: string;
    defaultValue?: string;
    rows?: number;
    cols?: number;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    onMutate?: any;
    disabled?: boolean;
    divCss?: string;
    labelCss?: string;
    textareaCss?: string;
    error?: string;
};

function FormTextarea({
    name,
    label,
    value,
    placeholder,
    rows,
    cols,
    minLength,
    maxLength,
    required,
    onMutate,
    disabled,
    divCss,
    labelCss,
    textareaCss,
    error,
}: FormTextareaProps): JSX.Element {
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
            <Textarea
                id={name}
                name={name}
                value={value ?? ""}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                minLength={minLength}
                maxLength={maxLength}
                onChange={onMutate}
                disabled={disabled}
                required={required}
                className={`resize-none border text-xs sm:text-sm bg-white text-gray-800 rounded-md px-3 py-2 focus-visible:ring focus-visible:border-amber-500 ${textareaCss}`}
            />

            {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
        </div>
    );
}

export default FormTextarea;
