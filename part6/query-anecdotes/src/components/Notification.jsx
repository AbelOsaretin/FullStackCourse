const Notification = ({ notificationContent }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  // if (true) return null

  return <div style={style}>{notificationContent}</div>
}

export default Notification
