import styles from './icons.module.css';
import {
  FaArrowsRotate,
  FaCropSimple,
  FaWandMagicSparkles,
  FaTrash,
  FaPlus,
  FaMinus,
} from 'react-icons/fa6';
import { BiReset } from "react-icons/bi";
export default function Button({
  type = '',
  classname = '',
  onClick = () => {},
}) {
  const buttonConfigs = {
    rotate: {
      icon: <FaArrowsRotate />,
    },
    crop: {
      icon: <FaCropSimple />,
    },
    magicedit: {
      icon: <FaWandMagicSparkles />,
    },
    delete: {
      icon: <FaTrash />,
    },
    zoomin: {
      icon: <FaPlus />,
    },
    zoomout: {
      icon: <FaMinus />,
    },
    reset: {
      icon: <BiReset />,
    },
  };

  const config = buttonConfigs[type] || { icon: null };

  return (
    <button
      className={`${styles['color-fill-primary']} ${styles['size-xl']} `}
      onClick={onClick}
    >
      {config.icon}
    </button>
  );
}
