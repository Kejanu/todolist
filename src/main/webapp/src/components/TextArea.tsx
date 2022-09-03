import classNames from "classnames";

export interface Props {
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
    value?: string;
}

const TextArea = (props: Props) => {
    return (
        <textarea
            value={props.value}
            placeholder={props.placeholder}
            className={classNames([
                "tw-border tw-border-black tw-p-2 tw-w-full tw-h-32",
                props.className
            ])}
            onChange={e => props.onChange(e.target.value)}
        />
    )
}

export default TextArea;