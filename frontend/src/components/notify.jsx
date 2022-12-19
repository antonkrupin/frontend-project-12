import { toast } from 'react-toastify';

const Notify = (text) => {
  toast.success(text, {
    position: 'top-right',
    autoClose: 5000,
    theme: 'light',
  });
};

export const showNotify = (message) => {
  Notify(message);
};

export default Notify;
