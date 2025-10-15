import { type JSX } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormInputProps = {
    label?: string;
    name: string;
    type?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    required?: boolean;
    onMutate?: any;
    disabled?: boolean;
    maxLength?: number;
    minLength?: number;
    max?: number;
    min?: number;
    divCss?: string;
    labelCss?: string;
    inputCss?: string;
    error?: string;
};

const FormInput = ({
    label,
    name,
    type = "text",
    placeholder,
    value,
    defaultValue,
    required,
    onMutate,
    disabled,
    maxLength,
    minLength,
    max,
    min,
    divCss = "",
    labelCss = "",
    inputCss = "",
    error,
}: FormInputProps): JSX.Element => {
    return (
        <div className={divCss}>
            {label && (
                <Label
                    htmlFor={name}
                    className={`block capitalize font-semibold mb-2 ${labelCss}`}
                >
                    {label}:
                </Label>
            )}

            <Input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                maxLength={maxLength}
                minLength={minLength}
                max={max}
                min={min}
                onChange={onMutate}
                disabled={disabled}
                required={required}
                className={`w-full border text-sm bg-white text-gray-800 rounded-md px-3 py-2 focus-visible:ring focus-visible:border-amber-500  ${inputCss}`}
            />

            {error && <p className="text-red-500 text-sm mt-1">
                {error}
            </p>}
        </div>
    );
};

export default FormInput;
