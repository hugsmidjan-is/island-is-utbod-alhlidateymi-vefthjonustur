import { sanitizeSheetName } from '@island.is/portals/my-pages/core'
import XLSX from 'xlsx'
const locale = 'is-IS'

export const downloadVehicleOwnedFile = async (
  fileName: string,
  name: string,
  nationalId: string,
  header: Array<Array<string>>,
  data: Array<Array<any>>,
) => {
  const getFile = (name: string, output: string | undefined) => {
    const uri =
      'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'
    const encodedUri = encodeURI(`${uri}${output}`)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', fileName)
    document.body.appendChild(link)

    link.click()
  }
  const showOwnedVehicles = data[0].length > 0
  const showOperatorVehicles = data[1].length > 0

  const sheetData = [
    [],
    [`${fileName} ${new Date().toLocaleDateString(locale)}`],
    [`${name} ${nationalId}`],
    [],
    [
      `Ökutæki í eigu kt. ${nationalId} þann ${new Date().toLocaleDateString(
        locale,
      )}`,
    ],
    [],
    showOwnedVehicles ? header[0] : null,
    ...(showOwnedVehicles ? data[0] : [['Ekkert fannst']]),
    [],
    [
      `Ökutæki í umráði kt. ${nationalId} þann ${new Date().toLocaleDateString(
        locale,
      )}`,
    ],
    [],
    showOperatorVehicles ? header[1] : null,
    ...(showOperatorVehicles ? data[1] : [['Ekkert fannst']]),
  ]
  const sheetName = sanitizeSheetName(name)

  const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheetData)
  const workbook: XLSX.WorkBook = {
    Sheets: { [sheetName]: worksheet },
    SheetNames: [sheetName],
  }

  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'base64',
  })
  getFile(fileName, excelBuffer)
}
