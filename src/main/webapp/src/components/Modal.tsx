import Portal from "./Portal";
import {ReactNode} from "react";
import classNames from "classnames";

interface Props {
    children: ReactNode;
}

const Modal = ({children}: Props) => {
    return (
        <Portal className={"tw-absolute tw-top-0 tw-left-0 tw-h-full tw-w-full tw-backdrop-blur"}>
            <div
                className={classNames([
                    "tw-absolute tw-top-1/2 tw-left-1/2 ",
                    "tw-transform tw--translate-x-1/2 tw--translate-y-1/2",
                    "tw-min-w-1/2 tw-shadow"
                ])}>
                {children}
            </div>
        </Portal>
    )
};

interface ChildrenProps {
    children: ReactNode;
}

const Header = ({children}: ChildrenProps) => {
    return (
        <div className={"tw-bg-red-700 tw-p-2 tw-text-white tw-rounded-t tw-font-medium"}>
            {children}
        </div>
    );
}

const Body = ({children}: ChildrenProps) => {
    return (
        <div className={"tw-bg-white tw-h-64 tw-p-2 tw-flex tw-flex-col tw-gap-2 tw-items-center"}>
            {children}
        </div>
    );
}

const Footer = ({children}: ChildrenProps) => {
    return (
        <div className={"tw-bg-white tw-rounded-b"}>
            <div className={"tw-flex tw-justify-end tw-gap-2 tw-px-2 tw-pb-2"}>
                {children}
            </div>
        </div>
    );
}

Modal.Footer = Footer;
Modal.Header = Header;
Modal.Body = Body;
export default Modal;