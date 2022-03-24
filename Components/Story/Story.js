import React from 'react'

function Story() {
  return (
    <div className={styles.component}>
      <Avatar
        alt={user?.name ?? "Name..."}
        src={user?.imgSrc ?? "Name..."}
        sx={{ width: 45, height: 45 }}
        style={{ marginRight: 15 }}
      />
      <div className={styles.nameFlex}>
        <p className={styles.name}>{user?.name ?? "Name..."}</p>
        <p className={styles.message}>Click To Open</p>
      </div>
      <div className={styles.timeFlex}>
        <p className={styles.time}>11:30 pm</p>
        <p className={styles.unread}>3</p>
      </div>
    </div>
  )
}

export default Story