import ButtonFP from '@/components/buttons/btn-fill-primary';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import ButtonFS from '@/components/buttons/btn-fill-secondary';
import ButtonFG from '@/components/buttons/btn-fill-gray';
import ButtonFL from '@/components/buttons/btn-fill-light';
import ButtonIR from '@/components/buttons/btn-icon-right';
import ButtonPOIR from '@/components/buttons/btn-outline-icon-r';
import ButtonOP from '@/components/buttons/btn-outline-primary';
import ButtonOS from '@/components/buttons/btn-outline-secondary';
import ButtonLGIR from '@/components/buttons/btnlg-icon-right';
import ButtonLGPOIR from '@/components/buttons/btnlg-outline-icon-r';
import ButtonSMFL2 from '@/components/buttons/btnsm-fill-light2';
import ButtonOP2 from '@/components/buttons/btn-outline-primary2';

export default function Test() {
  return (
    <div
      style={{
        backgroundColor: '#DCF0FC',
        minHeight: '100vh',
        margin: '30px',
      }}
    >
      <h4>這是按鈕</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <ButtonFP>潛點介紹</ButtonFP>
        <hr />
        <ButtonFP2>編輯</ButtonFP2>
        <hr />
        <ButtonFS />
        <hr />
        <ButtonFG />
        <hr />
        <ButtonFL>編輯</ButtonFL>
        <hr />
        <ButtonIR />
        <hr />
        <ButtonOP />
        <hr />
        <ButtonOS />
        <hr />
        <ButtonPOIR />
        <hr />
        <ButtonLGIR />
        <hr />
        <ButtonLGPOIR />
        <hr />
        <ButtonSMFL2>東北角</ButtonSMFL2>
        <hr />
        <ButtonOP2>東北角</ButtonOP2>
      </div>
    </div>
  );
}