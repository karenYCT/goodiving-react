import styles from './icons.module.css';
import {
  FaArrowsRotate,
  FaCropSimple,
  FaWandMagicSparkles,
  FaTrash,
  FaPlus,
  FaMinus,
} from 'react-icons/fa6';
import { FaPen } from 'react-icons/fa';
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
    pen: {
      icon: <FaPen />,
    },
  };

  const config = buttonConfigs[type] || { icon: null };

  return (
    <button
      className={`${styles['color-fill-pink']} ${styles['size-xl']} `}
      onClick={onClick}
    >
      {config.icon}
    </button>
  );
}
