import {ReactNode} from "react";
import classNames from "classnames";

interface Props {
    children: ReactNode;
    onClick: () => void;
    className?: string;
    variant?: ButtonVariant;
    appearance?: ButtonAppearance;
    disabled?: boolean;
}

export type ButtonVariant = "success" | "warning";
export type ButtonAppearance = "icon";

const Button = (props: Props) => {
    return (
        <button
            disabled={props.disabled}
            className={classNames([
                "tw-p-2",
                {"tw-w-24 tw-border tw-border-black tw-rounded": props.appearance === undefined},
                {"tw-bg-slate-200 hover:tw-bg-slate-300": props.variant === undefined && props.appearance === undefined},
                {"tw-bg-emerald-500 hover:tw-bg-emerald-600": props.variant === "success" && props.appearance === undefined},
                props.className
            ])}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}


export default Button;