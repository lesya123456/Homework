import React from 'react';

interface ErrorModalProps {
  message: string;
  setHideModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, setHideModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={() => setHideModal(true)}>Close</button>
      </div>
    </div>
  );
};

export default ErrorModal;
