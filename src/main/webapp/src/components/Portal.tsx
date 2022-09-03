import {FC, ReactNode, useEffect, useMemo} from "react";
import {createPortal} from "react-dom";
import classNames from "classnames";

interface Props {
    children: ReactNode;
    offset?: DOMRect;
    className?: string;
}

const Portal: FC<Props> = ({children, offset, className}: Props) => {
    const portalDiv = useMemo(() => {
        const div = document.createElement("div")
        div.className = classNames(["tw-absolute", className]);
        return div;
    }, []);

    const style = offset ? {
        top: offset.top + offset.height,
        left: offset.left
    } : {}

    useEffect(() => {
        document.body.appendChild(portalDiv)
        return () => {
            document.body.removeChild(portalDiv)
        };
    }, [portalDiv]);

    return createPortal(
        (
            <div className={className} style={style}>
                {children}
            </div>
        ), portalDiv
    );
}

export default Portal;