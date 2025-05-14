const Notification = ({ message, design }) => {
  if (message === null) {
    return null;
  }

  return <div className={design}>{message}</div>;
};

export default Notification;