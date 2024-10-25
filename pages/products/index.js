import Search1sm from '@/components/search/search-1-sm';
import Search1lg from '@/components/search/search-1-lg';
import Search2sm from '@/components/search/search-2-sm';
import Search2lg from '@/components/search/search-2-lg';
import Search3sm from '@/components/search/search-3-sm';
import Search3lg from '@/components/search/search-3-lg';
import Search4sm from '@/components/search/search-4-sm';
import Search4lg from '@/components/search/search-4-lg';
import Pagination from '@/components/pagination';
import SelectContent from '@/components/dropdown/select-content';
import SelectContentIndex from '@/components/dropdown/select-content-index';
import DatePicker from '@/components/dropdown/date-picker';
import DatePickerIndex from '@/components/dropdown/date-picker-index';
import SortBy from '@/components/dropdown/sort-by';
import InputComponent from '@/components/inputs/input-component';
import Card2 from '@/components/eden/card2';
import Card1 from '@/components/eden/card1';

export default function Test() {
  return (
    <>
      <hr />
      <div
        style={{
          backgroundColor: '#C4CFDD',
          display: 'flex',
        }}
      >
        <Search1sm />
        <Search1lg />
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
        <SelectContent />
      </div>
      <hr />
      <div
        style={{
          backgroundColor: '#C4CFDD',
          display: 'flex',
        }}
      >
        <SortBy />
        <DatePicker />
      </div>
      <hr />

      <div
        style={{
          backgroundColor: '#C4CFDD',
          display: 'flex',
        }}
      >
        <InputComponent />
        <InputComponent isError={true} errorMessage="Error message" />
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
        <SelectContentIndex />
        <DatePickerIndex />
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
        <Card1 />
        <Card1 />
        <Card1 />
      </div>
      <hr />
      <div>
        <Pagination />
      </div>
    </>
  );
}
