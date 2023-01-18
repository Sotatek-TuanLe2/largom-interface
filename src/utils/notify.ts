import { toast } from 'react-toastify';

export type NOTIFY_TYPE = 'success' | 'warning' | 'error';

function addToast(type: NOTIFY_TYPE, message: string) {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    case 'error':
      toast.error(message);
      break;
  }
}

export function toastSuccess(message: string) {
  addToast('success', message);
}

export function toastWarning(message: string) {
  addToast('warning', message);
}

export function toastError(message: string) {
  addToast('error', message);
}
