import { useLocale, useNamespaces } from '@island.is/localization'
import { m, DynamicWrapper } from '@island.is/portals/my-pages/core'

import DocumentScreen from '../../components/DocumentScreen/DocumentScreen'

const LocalTax = () => {
  useNamespaces('sp.local-tax')
  const { formatMessage } = useLocale()

  return (
    <DynamicWrapper>
      <DocumentScreen
        title={formatMessage(m.financeLocalTax)}
        listPath="localTax"
        defaultDateRangeMonths={12}
      />
    </DynamicWrapper>
  )
}

export default LocalTax
