import { HttpException, Inject, Injectable } from '@nestjs/common'
import { TemplateApiModuleActionProps } from '../../../types'
import type { ComplaintsToAlthingiOmbudsmanConfig } from './config'
import { COMPLAINTS_TO_ALTHINGI_OMBUDSMAN_CONFIG } from './config'
import { generateConfirmationEmail } from './emailGenerators'
import { BaseTemplateApiService } from '../../base-template-api.service'
import { ApplicationTypes } from '@island.is/application/types'
import {
  CaseApi,
  DocumentInfo,
  TokenMiddleware,
} from '@island.is/clients/althingi-ombudsman'
import { ApplicationAttachmentProvider } from './attachments/providers/applicationAttachmentProvider'
import { applicationToCaseRequest } from './complaints-to-althingi-ombudsman.utils'
import { generateComplaintPdf } from './pdfGenerators'
import { SharedTemplateApiService } from '../../shared'

@Injectable()
export class ComplaintsToAlthingiOmbudsmanTemplateService extends BaseTemplateApiService {
  constructor(
    @Inject(COMPLAINTS_TO_ALTHINGI_OMBUDSMAN_CONFIG)
    private readonly complaintConfig: ComplaintsToAlthingiOmbudsmanConfig,
    private readonly caseApi: CaseApi,
    private readonly tokenMiddleware: TokenMiddleware,
    private readonly sharedTemplateAPIService: SharedTemplateApiService,
    private readonly applicationAttachmentProvider: ApplicationAttachmentProvider,
  ) {
    super(ApplicationTypes.COMPLAINTS_TO_ALTHINGI_OMBUDSMAN)
  }

  async submitApplication({ application }: TemplateApiModuleActionProps) {
    const complaintAttachedFiles =
      await this.applicationAttachmentProvider.getFiles(
        ['attachments.documents'],
        application,
      )
    const commissionsAttachedFiles =
      await this.applicationAttachmentProvider.getFiles(
        ['complainedForInformation.powerOfAttorney'],
        application,
      )
    const buffer = await generateComplaintPdf(application)
    const now = new Date()
    const nowString = now.toISOString().replace(/T.*$/g, '')
    const pdf: DocumentInfo = {
      content: buffer.toString('base64'),
      fileName: `kvörtun-${nowString}.pdf`,
      type: 'Kvörtun',
      subject: 'Kvörtun',
    }

    const attachedFiles = complaintAttachedFiles.concat(
      commissionsAttachedFiles,
    )

    const attachments = [pdf, ...attachedFiles]
    const caseRequest = await applicationToCaseRequest(application, attachments)
    const response = await this.caseApi
      .withMiddleware(this.tokenMiddleware)
      .createCase({ requestData: caseRequest })

    /* 
      This endpoint can return status code 200 with the succeeded property
      as false, we need to handle that case explicitly
    */
    if (response.succeeded !== true) {
      throw new HttpException(
        response.message ?? 'Request returned an Error',
        response.returnCode ?? 500,
      )
    }

    await this.sharedTemplateAPIService.sendEmail(
      (props) =>
        generateConfirmationEmail(
          props,
          this.complaintConfig.applicationSenderName,
          this.complaintConfig.applicationSenderEmail,
          pdf,
        ),
      application,
    )
    return null
  }
}
