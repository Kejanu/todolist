import classNames from "classnames";

export interface Props {
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
    value?: string;
}

const TextInput = (props: Props) => {
    return (
        <input
            value={props.value}
            placeholder={props.placeholder}
            className={classNames([
                "tw-border tw-border-black tw-p-2 tw-w-full",
                props.className
            ])}
            type="text"
            onChange={e => props.onChange(e.target.value)}
        />
    )
}

export default TextInput;