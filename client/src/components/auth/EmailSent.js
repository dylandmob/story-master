import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const EmailSent = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <FontAwesomeIcon icon={faCheck} color='#007bff' size='3x' />
      <h4 className='my-3'>
        An email has been sent to you. Click the link in the email to sign in!
      </h4>
    </div>
  );
};

export default EmailSent;
