import { toast } from 'react-toastify';

const Notify = (text) => {
  toast.success(text, {
    position: 'top-right',
    autoClose: 5000,
    theme: 'light',
  });
};

export const showNotify = (message, closeModal) => {
  // eslint-disable-next-line no-unused-expressions
  closeModal;
  Notify(message);
};

export default Notify;
