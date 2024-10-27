import styles from './icons.module.css';
import {  FaEdit, FaTrash  } from 'react-icons/fa';

export default function Button({ 
  type = '',
  classname = '', 
  onClick = () => {} 
}) {
  const buttonConfigs = {
    edit: {
      icon: <FaEdit />,
    },
    delete:{
      icon: <FaTrash  />,
    }
  };
  
  const config = buttonConfigs[type];

  return (
    <button
      className={`${styles['color-fill-gray']} ${styles['size-xl']} `}
      onClick={onClick}
    >
      {config.icon || ''}
    </button>
  );
}
