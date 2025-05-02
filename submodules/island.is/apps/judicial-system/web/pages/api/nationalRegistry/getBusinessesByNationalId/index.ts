import { NextApiRequest, NextApiResponse } from 'next'

import { NationalRegistryResponseBusiness } from '@island.is/judicial-system-web/src/types'

const getBusinessesByNationalId = async (
  nationalId: string,
): Promise<NationalRegistryResponseBusiness> => {
  const response = await fetch(
    `https://api.ja.is/skra/v1/businesses?kennitala=${nationalId}`,
    {
      headers: {
        Authorization: process.env.NATIONAL_REGISTRY_API_KEY || '',
      },
    },
  )

  return await response.json()
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const nationalId = (req.query.nationalId as string).replace('-', '')

  const businesses = await getBusinessesByNationalId(nationalId)
  res.status(200).json(businesses)
}
