import { z } from 'zod'

export const dataSchema = z.object({
  approveExternalData: z.boolean().refine((v) => v),
  signee: z.object({
    name: z.string(),
    nationalId: z.string(),
    address: z.string(),
    area: z.string(),
  }),
  listId: z.string().min(1),
})

export type PresidentialSignListSchema = z.TypeOf<typeof dataSchema>
