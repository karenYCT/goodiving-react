import { FaSquareCheck, FaRegSquare } from 'react-icons/fa6';
import styles from './input-component.module.css';

export default function InputCheck({
  name = '',
  options = [],
  selectedValues = [],
  onChange = () => {},
}) {
    // 使用這個元件的時候要在在父元件寫 :
    // 1. 這個選項: [{ label:"男生", value},{label:'女生',value:"woman"},....]
    // 2. 設定狀態: const [selectedHobbies, setSelectedHobbies] = useState([]);
    // 3. 傳 props: name="這組Checkbox的名字" options={options}  selectedValues={selectedHobbies} onChange={setSelectedHobbies} 



   // 檢查陣列中是否已經有這個選項
     const isChecked = (value) => {
    return selectedValues.includes(value);
  }

  const handleCheckboxChange = (value) => {
    if (isChecked(value)) {
      // 如果已選取則移除
      onChange(selectedValues.filter((selectedValue) => {
        return selectedValue !== value;
      }));
    } else {
      // 如果未選取則加入
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div >
      {options.map((option, i) => (
        <div
          key={`${name}-${i}`}
          onClick={() => handleCheckboxChange(option.value)}
        >
          {isChecked(option.value) ? (
            <FaSquareCheck className={styles['check-c']} />
          ) : (
            <FaRegSquare className={styles['check-n']} />
          )}
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  );
}
