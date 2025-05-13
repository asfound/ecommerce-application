import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function showToast(message: string, isError = false): void {
  const textColor = isError ? '#e77373' : '#7fccc6';
  const backgroundColor = isError ? '#403738' : '#383c3c';
  Toastify({
    close: false,
    duration: 3000,
    gravity: 'bottom',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: backgroundColor,
      borderRadius: '4px',
      boxShadow: 'none',
      color: textColor,
      fontSize: '1.4rem',
    },
    text: message,
  }).showToast();
}
