import { EmailTemplateGenerator } from '../../../../../types'
import { CreateListSchema } from '@island.is/application/templates/signature-collection/presidential-list-creation'
import { OwnerInput } from '@island.is/clients/signature-collection'
import { SignatureCollection } from '../types'
import { Message, Body } from '@island.is/email-service'

export const generateApplicationSubmittedEmail: EmailTemplateGenerator = (
  props,
): Message => {
  const {
    application,
    options: { email },
  } = props

  const answers = application.answers as CreateListSchema

  const owner: OwnerInput = answers.applicant
  const currentCollection: SignatureCollection = application.externalData
    .currentCollection?.data as SignatureCollection

  const subject = 'Ný meðmælasöfnun hefur verið stofnuð'
  const lists: Body[] = currentCollection.areas.map((area) => {
    return {
      component: 'Copy',
      context: { copy: `${owner.name} - ${area.name}` },
    }
  })

  return {
    from: {
      name: email.sender,
      address: email.address,
    },
    to: [
      {
        name: 'Landskjörstjórn',
        address: 'postur@landskjorstjorn.is',
      },
      {
        name: 'Þjóðskrá',
        address: 'kosningar@skra.is',
      },
    ],
    subject,
    template: {
      title: subject,
      body: [
        { component: 'Heading', context: { copy: subject } },
        {
          component: 'Copy',
          context: {
            copy: `${owner.name} Kt: ${owner.nationalId} hefur stofnað eftirfarandi lista til meðmælasöfnunar:`,
          },
        },
        ...lists,
        {
          component: 'Copy',
          context: {
            copy: `Samskiptaupplýsingar framboðs. Sími ${owner.phone} Netfang: ${owner.email} `,
          },
        },
      ],
    },
  }
}
