import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

/**
 * Toast Notification Alert Component
 */
export const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 6000);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="toast-container" role="alert" aria-live="assertive">
      <div className={`toast-item ${isSuccess ? 'success' : 'error'}`}>
        <div className="toast-icon">
          {isSuccess ? <CheckCircle2 size={22} /> : <AlertCircle size={22} />}
        </div>
        <div className="toast-content">
          <div className="toast-title">{toast.title || (isSuccess ? 'Success!' : 'Notice')}</div>
          <div className="toast-msg">{toast.message}</div>
        </div>
        <button
          onClick={onClose}
          className="toast-close-btn"
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
