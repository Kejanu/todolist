import React, {useEffect, useState} from "react";
import classNames from "classnames";

interface Props {
    dispatch: any;
    type: string;
    message: string;
    id: string;
}

const Notification = (props: Props) => {
    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(0);
    const [intervalID, setIntervalID] = useState<NodeJS.Timer | null>(null);

    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth(prev => {
                if (prev < 100) {
                    return prev + 0.5;
                }

                clearInterval(id);
                return prev;
            });
        }, 20);
        setIntervalID(id);
    };

    const handlePauseTimer = () => {
        clearInterval(intervalID as NodeJS.Timer);
    };

    const handleCloseNotification = () => {
        handlePauseTimer();
        setExit(true);
        setTimeout(() => {
            props.dispatch({
                type: "REMOVE_NOTIFICATION",
                id: props.id
            })
        }, 400)
    };

    useEffect(() => {
        if (width === 100) {
            // Close notification
            handleCloseNotification()
        }
    }, [width]);

    useEffect(() => {
        handleStartTimer();
    }, []);


    return (
        <div
            onMouseEnter={handlePauseTimer}
            onMouseLeave={() => {
                handleStartTimer();
            }}
            className={classNames([
                "notification-item tw-rounded tw-overflow-hidden tw-mb-2 tw-border tw-border-black",
                {
                    "tw-bg-emerald-500": props.type === "SUCCESS",
                    "tw-bg-red-500": props.type === "ERROR",
                    "exit": exit
                }
            ])}
            style={{width: "300px"}}
        >
            <p className={"tw-p-2"}>{props.message}</p>
            <div className={classNames([
                "tw-h-2",
                {
                    "tw-bg-emerald-900": props.type === "SUCCESS",
                    "tw-bg-red-900": props.type === "ERROR",
                }
            ])} style={{width: `${width}%`}}/>
        </div>
    );
};

export default Notification;