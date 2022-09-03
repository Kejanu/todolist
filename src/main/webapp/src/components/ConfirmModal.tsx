import React, {ReactNode} from "react";
import Modal from "./Modal";
import Button from "./Button";

interface Props {
    title: string;
    children: ReactNode;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmModal = (props: Props) => {
    return (
        <Modal>
            <Modal.Header>
                {props.title}
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onCancel}>
                    Cancel
                </Button>
                <Button variant={"success"} onClick={props.onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;