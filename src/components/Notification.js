const Notification = ({message}) => {
    if (message.text === null) {
        return null
    }

    let notifClass = '';
    if (message.text && message.type === 'general') {
        notifClass = 'notif';
    } else if (message.text && message.type === 'error') {
        notifClass = 'error';
    }

    return (
        <div className={notifClass}>
            {message.text}
        </div>
    )
}
export default Notification;
