import ButtonFP from '@/components/buttons/btn-fill-primary'
import ButtonFS from '@/components/buttons/btn-fill-secondary'
import ButtonFG from '@/components/buttons/btn-fill-gray'
import ButtonFL from '@/components/buttons/btn-fill-light'
import ButtonIR from '@/components/buttons/btn-icon-right'
import ButtonPOIR from '@/components/buttons/btn-outline-icon-r'
import ButtonOP from '@/components/buttons/btn-outline-primary'
import ButtonOS from '@/components/buttons/btn-outline-secondary'

export default function Test() {
  return (
    <div style={{ backgroundColor: '#DCF0FC', minHeight: '100vh' }}>
      <h1>這是按鈕</h1>
      <ButtonFP />
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
    </div>
  )
}
