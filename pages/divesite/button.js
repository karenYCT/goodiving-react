import ButtonFP from '@/components/buttons/btn-fill-primary';
import ButtonFS from '@/components/buttons/btn-fill-secondary';
import ButtonFG from '@/components/buttons/btn-fill-gray';
import ButtonFL from '@/components/buttons/btn-fill-light';
import ButtonIR from '@/components/buttons/btn-icon-right';
import ButtonPOIR from '@/components/buttons/btn-outline-icon-r';
import ButtonOP from '@/components/buttons/btn-outline-primary';
import ButtonOS from '@/components/buttons/btn-outline-secondary';
import ButtonLGIR from '@/components/buttons/btnlg-icon-right';
import ButtonLGPOIR from '@/components/buttons/btnlg-outline-icon-r';

export default function Test() {
  return (
    <div style={{ backgroundColor: '#DCF0FC', minHeight: '100vh' }}>
      <h4>這是按鈕</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <ButtonFP>潛點介紹</ButtonFP>  
        <hr />
        <ButtonFS />
        <hr />
        <ButtonFG />
        <hr />
        <ButtonFL />
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
      </div>
    </div>
  );
}
