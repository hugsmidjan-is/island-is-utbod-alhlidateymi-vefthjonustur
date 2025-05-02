import { z } from 'zod'
import * as kennitala from 'kennitala'
import { error } from './messages'

const UserSchemaBase = z.object({
  nationalId: z
    .string()
    .refine(
      (nationalId) =>
        nationalId &&
        nationalId.length !== 0 &&
        kennitala.isValid(nationalId) &&
        (kennitala.isCompany(nationalId) ||
          kennitala.info(nationalId).age >= 18),
    ),
  name: z.string().min(1),
})

export const EnergyFundsSchema = z.object({
  approveExternalData: z.boolean().refine((v) => v),
  userInformation: UserSchemaBase,
  selectVehicle: z.object({
    plate: z.string().min(1),
    grantAmount: z.number().optional(),
    grantItemCode: z.string().optional(),
    type: z.string().optional(),
  }),
  vehicleDetails: z.object({
    price: z
      .string()
      .min(1)
      .refine(
        (x) => {
          return parseInt(x) <= 10000000
        },
        { params: error.priceError },
      ),
  }),
  grant: z.object({
    bankNumber: z.string().min(1),
    grantAmount: z.number().optional(),
  }),
})

export type EnergyFunds = z.TypeOf<typeof EnergyFundsSchema>
