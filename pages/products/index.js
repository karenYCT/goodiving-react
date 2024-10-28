import { useState } from 'react';
import Search1sm from '@/components/search/search-1-sm';
import Search1lg from '@/components/search/search-1-lg';
import Search2sm from '@/components/search/search-2-sm';
import Search2lg from '@/components/search/search-2-lg';
import Search3sm from '@/components/search/search-3-sm';
import Search3lg from '@/components/search/search-3-lg';
import Search4sm from '@/components/search/search-4-sm';
import Search4lg from '@/components/search/search-4-lg';
import Pagination from '@/components/pagination';
import SelectRect from '@/components/dropdown/select-rect';
import SelectEllipse from '@/components/dropdown/select-ellipse';
import SelectEllipseIndex from '@/components/dropdown/select-ellipse-index';
import DatePicker from '@/components/dropdown/date-picker';
import DatePickerIndex from '@/components/dropdown/date-picker-index';
import InputComponent from '@/components/inputs/input-component';
import Card2 from '@/components/eden/card2';
import Card1 from '@/components/eden/card1';
import Card3 from '@/components/eden/card3';

export default function Test() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [inputValue, setInputValue] = useState('');
  const options = ['AAA', 'BBB', 'CCC'];
  const onClick = () => {
    console.log('送出搜尋');
  };
  return (
    <>
      <hr />
      <div
        style={{
          backgroundColor: '#C4CFDD',
          display: 'flex',
        }}
      >
        <Search1sm
          inputValue={inputValue}
          setInputValue={setInputValue}
          onClick={onClick}
        />
        <Search1lg
          inputValue={inputValue}
          setInputValue={setInputValue}
          onClick={onClick}
        />
      </div>
      <hr />
      <div
        style={{
          backgroundColor: '#C4CFDD',
          display: 'flex',
        }}
      >
        <Search2sm />
        <Search2lg />
      </div>
      <hr />
      <div
        style={{
          backgroundColor: '#C4CFDD',
          display: 'flex',
        }}
      >
        <Search3sm />
        <Search3lg />
      </div>
      <hr />
      <div
        style={{
          backgroundColor: '#C4CFDD',
          display: 'flex',
        }}
      >
        <Search4sm />
        <Search4lg />
      </div>
      <hr />
      <div
        style={{
          backgroundColor: '#C4CFDD',
          display: 'flex',
        }}
      >
        <SelectEllipse
          options={options}
          onChange={setSelectedOption}
          option={selectedOption}
        />
      </div>
      <hr />
      <div
        style={{
          backgroundColor: '#C4CFDD',
          display: 'flex',
        }}
      >
        <SelectRect
          options={options}
          onChange={setSelectedOption}
          option={selectedOption}
        />
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <hr />

      <div
        style={{
          backgroundColor: '#C4CFDD',
          display: 'flex',
        }}
      >
        <InputComponent inputValue={inputValue} setInputValue={setInputValue} />
        <InputComponent
          isError={true}
          errorMessage="Error message"
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>
      <hr />
      <div
        style={{
          backgroundColor: '#C4CFDD',
          display: 'flex',
          height: '250px',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <SelectEllipseIndex
          options={options}
          onChange={setSelectedOption}
          option={selectedOption}
        />
        <DatePickerIndex
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <hr />
      <div
        style={{
          backgroundColor: '#C4CFDD',
          display: 'flex',
        }}
      >
        <Card1 />
        <Card1 />
        <Card1 />
      </div>
      <hr />
      <div
        style={{
          backgroundColor: '#C4CFDD',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Card2 />
        <Card2 />
      </div>
      <hr />
      <div
        style={{
          backgroundColor: '#C4CFDD',
          display: 'flex',
        }}
      >
        <Card3 />
        <Card3 />
        <Card3 />
      </div>
      <hr />
      <div>
        <Pagination />
      </div>
    </>
  );
}
