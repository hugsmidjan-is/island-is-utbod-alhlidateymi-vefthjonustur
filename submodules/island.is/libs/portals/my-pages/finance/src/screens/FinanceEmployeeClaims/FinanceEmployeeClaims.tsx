import { useLocale, useNamespaces } from '@island.is/localization'
import { m, DynamicWrapper } from '@island.is/portals/my-pages/core'

import DocumentScreen from '../../components/DocumentScreen/DocumentScreen'

const EmployeeClaims = () => {
  useNamespaces('sp.employee-claims')
  const { formatMessage } = useLocale()

  return (
    <DynamicWrapper>
      <DocumentScreen
        title={formatMessage(m.financeEmployeeClaims)}
        listPath="employeeClaims"
        defaultDateRangeMonths={12}
      />
    </DynamicWrapper>
  )
}

export default EmployeeClaims
