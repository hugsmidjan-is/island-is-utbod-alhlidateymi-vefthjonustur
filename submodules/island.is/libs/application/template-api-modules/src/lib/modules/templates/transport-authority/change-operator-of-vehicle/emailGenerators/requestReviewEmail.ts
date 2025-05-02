import { ChangeOperatorOfVehicleAnswers } from '@island.is/application/templates/transport-authority/change-operator-of-vehicle'
import { Message } from '@island.is/email-service'
import { EmailTemplateGeneratorProps } from '../../../../../types'
import { EmailRecipient } from '../types'
import { getApplicationPruneDateStr } from '../change-operator-of-vehicle.utils'
import { pathToAsset } from '../change-operator-of-vehicle.utils'
import { ApplicationConfigurations } from '@island.is/application/types'

export type RequestReviewEmail = (
  props: EmailTemplateGeneratorProps,
  recipient: EmailRecipient,
) => Message

export const generateRequestReviewEmail: RequestReviewEmail = (
  props,
  recipient,
): Message => {
  const {
    application,
    options: { email, clientLocationOrigin },
  } = props
  const answers = application.answers as ChangeOperatorOfVehicleAnswers
  const permno = answers?.pickVehicle?.plate

  if (!recipient.email) throw new Error('Recipient email was undefined')
  if (!permno) throw new Error('Permno was undefined')

  const subject = 'Tilkynning um breytingu á umráðamönnum - Vantar samþykki'
  const pruneDateStr = getApplicationPruneDateStr(application.created)

  return {
    from: {
      name: email.sender,
      address: email.address,
    },
    to: [{ name: recipient.name, address: recipient.email }],
    subject,
    template: {
      title: subject,
      body: [
        {
          component: 'Image',
          context: {
            src: pathToAsset('logo.jpg'),
            alt: 'Ísland.is logo',
          },
        },
        {
          component: 'Image',
          context: {
            src: pathToAsset('computerIllustration.jpg'),
            alt: 'Kaffi við skjá myndskreyting',
          },
        },
        {
          component: 'Heading',
          context: { copy: subject },
        },
        {
          component: 'Copy',
          context: {
            copy:
              `<span>Góðan dag,</span><br/><br/>` +
              `<span>Þín bíður ósamþykkt beiðni um breytingu á umráðamönnum fyrir ökutækið ${permno} á island.is.</span><br/>` +
              `<span>Þú hefur 7 daga til þess að samþykkja beiðnina.</span><br/>` +
              `<span>Ef umsókn hefur ekki verið samþykkt fyrir ${pruneDateStr} munu hún falla niður.</span><br/>` +
              `<span>Hægt er að fara yfir beiðnina á island.is eða með því að smella á hlekkinn hér fyrir neðan.</span><br/>`,
          },
        },
        {
          component: 'Button',
          context: {
            copy: 'Skoða umsókn',
            href: `${clientLocationOrigin}/${ApplicationConfigurations.ChangeOperatorOfVehicle.slug}/${application.id}`,
          },
        },
      ],
    },
  }
}
