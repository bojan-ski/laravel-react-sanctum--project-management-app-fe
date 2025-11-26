import { type JSX } from "react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type FormSelectProps = {
    label?: string;
    name: string;
    defaultValue?: string;
    options: any[];
    disabledOptionLabel?: string;
    required?: boolean;
    disabled?: boolean;
    onMutate?: (value: any) => void;
    divCss?: string;
    labelCss?: string;
    selectCss?: string;
    error?: string;
};

function FormSelect({
    label,
    name,
    defaultValue = "",
    options = [],
    disabledOptionLabel,
    required = false,
    disabled,
    onMutate,
    divCss = "",
    labelCss = "",
    selectCss = "",
    error,
}: FormSelectProps): JSX.Element {
    const isObjectOptions: boolean = !Array.isArray(options) && typeof options === "object";

    return (
        <div className={divCss}>
            {label && (
                <Label
                    htmlFor={name}
                    className={`block capitalize font-semibold mb-2 ${labelCss}`}
                >
                    {label}
                </Label>
            )}

            <Select
                name={name}
                defaultValue={defaultValue}
                onValueChange={onMutate}
                required={required}
            >
                <SelectTrigger
                    id={name}
                    className={`w-full border text-sm bg-white text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:shadow-md ${selectCss}`}
                >
                    <SelectValue placeholder={disabledOptionLabel} />
                </SelectTrigger>

                {/* array or object options */}
                <SelectContent>
                    {isObjectOptions
                        ? Object.entries(options).map(([optionValue, optionLabel]) => (
                            <SelectItem
                                key={optionValue}
                                value={optionValue}
                                disabled={disabled}
                            >
                                {optionLabel}
                            </SelectItem>
                        ))
                        : options.map((optionLabel, idx) => (
                            <SelectItem
                                key={idx}
                                value={optionLabel}
                                disabled={disabled}
                            >
                                {optionLabel}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>

            {error && <p className="text-red-500 text-sm mt-1">
                {error}
            </p>}
        </div>
    );
}

export default FormSelect;
