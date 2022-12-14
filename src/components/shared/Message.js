import React from 'react'
import Alert from 'react-bootstrap/Alert';
const Message = ({variant,msg}) => {
  return (
    <Alert  variant={variant}>
    {msg}
  </Alert>
  )
}

export default Message