import React, {createContext, ReactNode, useContext, useReducer} from "react";
import Notification from "./Notification";
import {v4} from "uuid";

interface Props {
    children: ReactNode;
}

const NotificationContext = createContext<any>(undefined);

export const NotificationProvider = (props: Props) => {
    const [state, dispatch] = useReducer((state: any, action: any) => {
        switch (action.type) {
            case "ADD_NOTIFICATION":
                return [...state, {...action.payload}];
            case "REMOVE_NOTIFICATION":
                return state.filter((el: any) => el.id !== action.id);
            default:
                return state;
        }
    }, []);

    return (
        <NotificationContext.Provider value={dispatch}>
            <div className={"tw-fixed tw-top-10 tw-right-10"} style={{width: "300px"}}>
                {state.map((note: any) =>
                    <Notification
                        key={note.id}
                        id={note.id}
                        dispatch={dispatch}
                        type={note.type}
                        message={note.message}
                    />
                )}
            </div>
            {props.children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const dispatch = useContext(NotificationContext);

    const showSuccess = (message: any) => {
        dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
                id: v4(),
                type: "SUCCESS",
                message: message.toString()
            }
        });
    };

    const showError = (error: Error) => {
        dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
                id: v4(),
                type: "ERROR",
                message: error.message
            }
        });
    };

    return {showSuccess, showError};
};