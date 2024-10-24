import IconPrimarySMR from '@/components/icons/icon-fill-primary-smright'
import IconPrimarySML from '@/components/icons/icon-fill-primary-smleft'
import IconSecondaryLGR from '@/components/icons/icon-fill-secondary-lgright'
import IconSecondaryLGL from '@/components/icons/icon-fill-secondary-lgleft'
import IconLightLGR from '@/components/icons/icon-fill-light-lgright'
import IconLightLGL from '@/components/icons/icon-fill-light-lgleft'
import IconOutlinePrimarySMR from '@/components/icons/icon-outline-primary-smright'
import IconOutlinePrimarySML from '@/components/icons/icon-outline-primary-smleft'
import IconOutlinePrimaryLGR from '@/components/icons/icon-outline-primary-lgright'
import IconOutlinePrimaryLGL from '@/components/icons/icon-outline-primary-lgleft'
import IconOutlinePrimaryMDR from '@/components/icons/icon-outline-primary-mdright'
import IconOutlinePrimaryMDL from '@/components/icons/icon-outline-primary-mdleft'

export default function Icon(props) {
  return (
    <div style={{ backgroundColor: '#DCF0FC', minHeight: '100vh' }}>
      <h1>這是icon按鈕</h1>
      <h3>small</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <IconPrimarySML />
          <IconPrimarySMR />
        </div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <IconOutlinePrimarySML />
          <IconOutlinePrimarySMR />
        </div>
        <h3>medium</h3>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <IconOutlinePrimaryMDL />
          <IconOutlinePrimaryMDR />
        </div>
        <h3>large</h3>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <IconSecondaryLGL />
          <IconSecondaryLGR />
        </div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <IconLightLGL />
          <IconLightLGR />
        </div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <IconOutlinePrimaryLGL />
          <IconOutlinePrimaryLGR />
        </div>
      </div>
    </div>
  )
}
