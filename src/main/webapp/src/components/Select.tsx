import classNames from "classnames";
import {ReactNode} from "react";

export interface Props {
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
    value?: string;
    children: ReactNode;
}

const Select = (props: Props) => {
    return (
        <select
            className={classNames([
                "tw-border tw-border-black tw-p-2 tw-w-full",
                props.className
            ])}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
        >
            {props.children}
        </select>
    )
}

interface OptionProps {
    children: ReactNode;
    value: string;
}

const Option = ({children, value}: OptionProps) => {
    return (
        <option value={value} className={"tw-p-2 tw-h-16"}>
            {children}
        </option>
    );
}


Select.Option = Option;
export default Select;