import styles from './icons.module.css';
import { FaArrowsRotate, FaCropSimple, FaWandMagicSparkles, FaTrash } from "react-icons/fa6";

export default function Button({ 
  type = '',
  classname = '', 
  onClick = () => {} 
}) {
  const buttonConfigs = {
    rotate: {
      icon: <FaArrowsRotate />,
    },
    crop:{
      icon: <FaCropSimple  />,
    },
    magicedit: {
      icon: <FaWandMagicSparkles  />,
    },
    delete:{
      icon: <FaTrash  />,
    }
  };
  
  const config = buttonConfigs[type]|| { icon: null };

  return (
    <button
      className={`${styles['color-fill-primary']} ${styles['size-xl']} `}
      onClick={onClick}
    >
      {config.icon}
    </button>
  );
}
