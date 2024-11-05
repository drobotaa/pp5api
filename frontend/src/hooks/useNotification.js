import { useState } from "react";
import Alert from 'react-bootstrap/Alert';

export function useNotification () {
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);

    const showNotification = (msg) => {
        setMessage(msg);
        setVisible(true);
        setTimeout(() => setVisible(false), 2000)
    }

    const Notification = () => (
        visible && (
            <Alert variant="success" className="mt-3 text-center">
                {message}
            </Alert>
        )
    );
    return { showNotification, Notification}
}