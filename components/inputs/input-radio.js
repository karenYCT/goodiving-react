import { FaRegDotCircle, FaRegCircle } from 'react-icons/fa';
import styles from './input-component.module.css';

export default function InputRadio({
  name="", 
  options = [],
  onChange = () => {},
  selectedRadio="",
}) {
    // 使用這個元件的時候要在在父元件寫
    // 1. 這個選項: [{ label:"男生", value},{label:'女生',value:"woman"},....]
    // 2. 設定狀態: const [selectedRadio, setSelectedRadio] = useState('預設值(選value)');
    // 3. 傳 props: name="這組RADIO的名字" options={options}  selectedRadio={selectedRadio} onChange={handleRadioChange} 
  return (
    <>
      {options.map((option, i) => (
        <div
          key={`${name}-${i}`}
          onClick={() => onChange(option.value)}
        >
          {option.value === selectedRadio ? (
            <FaRegDotCircle className={styles['check-c']} />
          ) : (
            <FaRegCircle className={styles['check-n']} />
          )}
          <span>{option.label}</span>
        </div>
      ))}
    </>
  );
}
