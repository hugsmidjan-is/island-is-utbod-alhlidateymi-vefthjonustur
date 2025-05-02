import '@testing-library/jest-dom'

import { formatBankInfo, formatPhoneNumber } from './formatters'

describe('formatters', () => {
  describe('formatBankInfo', () => {
    it('should return the same value if bank info is in correct format', async () => {
      // arrange
      const bankInfo = '0000-11-222222'
      const expectedBankInfo = '0000-11-222222'
      // assert
      expect(formatBankInfo(bankInfo)).toBe(expectedBankInfo)
    })

    it('should format bank info if it comes as 12 characters length string', async () => {
      // arrange
      const bankInfo = '000011222222'
      const expectedBankInfo = '0000-11-222222'
      // assert
      expect(formatBankInfo(bankInfo)).toBe(expectedBankInfo)
    })

    it('should return the same value if bank info is too long', async () => {
      // arrange
      const bankInfo = '0000112222222'
      const expectedBankInfo = '0000112222222'
      // assert
      expect(formatBankInfo(bankInfo)).toBe(expectedBankInfo)
    })

    it('should return the same value if bank info comes in weird format', async () => {
      // arrange
      const bankInfo = '000#test011222$$222'
      const expectedBankInfo = '000#test011222$$222'
      // assert
      expect(formatBankInfo(bankInfo)).toBe(expectedBankInfo)
    })
  })

  describe('formatPhoneNumber', () => {
    it('should return the same value if phone number is in correct format', async () => {
      // arrange
      const phoneNumber = '999-9999'
      const expectedPhoneNumber = '999-9999'
      // assert
      expect(formatBankInfo(phoneNumber)).toBe(expectedPhoneNumber)
    })

    it('should format phone number if it comes as 7 characters length string', async () => {
      // arrange
      const phoneNumber = '9999999'
      const expectedPhoneNumber = '999-9999'
      // assert
      expect(formatPhoneNumber(phoneNumber)).toBe(expectedPhoneNumber)
    })

    it('should return the same value if phone number is too long', async () => {
      // arrange
      const phoneNumber = '99999999'
      const expectedPhoneNumber = '99999999'
      // assert
      expect(formatPhoneNumber(phoneNumber)).toBe(expectedPhoneNumber)
    })

    it('should return the same value if phone number comes in weird format', async () => {
      // arrange
      const phoneNumber = '99999-99-9999'
      const expectedPhoneNumber = '99999-99-9999'
      // assert
      expect(formatBankInfo(phoneNumber)).toBe(expectedPhoneNumber)
    })
  })
})
