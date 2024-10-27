import styles from './icons.module.css';
import { FaArrowsRotate, FaCropSimple, FaWandMagicSparkles } from "react-icons/fa6";

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
    }
  };
  
  const config = buttonConfigs[type];

  return (
    <button
      className={`${styles['color-fill-primary']} ${styles['size-xl']} `}
      onClick={onClick}
    >
      {config.icon || ''}
    </button>
  );
}
