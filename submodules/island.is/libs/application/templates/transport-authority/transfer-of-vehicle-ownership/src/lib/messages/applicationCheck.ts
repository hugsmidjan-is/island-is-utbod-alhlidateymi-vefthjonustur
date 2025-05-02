import { defineMessages } from 'react-intl'

export const applicationCheck = {
  submitApplication: defineMessages({
    sellerNotValid: {
      id: 'ta.tvo.application:applicationCheck.submitApplication.sellerNotValid',
      defaultMessage:
        'Aðeins sá sem skráði umsókn má vera skráður sem seljandi.',
      description: 'Only applicant can be registered as seller',
    },
  }),
  validation: defineMessages({
    alertTitle: {
      id: 'ta.tvo.application:applicationCheck.validation.alertTitle',
      defaultMessage: 'Það kom upp villa',
      description: 'Application check validation alert title',
    },
    fallbackErrorMessage: {
      id: 'ta.tvo.application:applicationCheck.validation.fallbackErrorMessage',
      defaultMessage: 'Það kom upp villa við að sannreyna gögn',
      description: 'Fallback error message for validation',
    },
    E2: {
      id: 'ta.tvo.application:applicationCheck.validation.E2',
      defaultMessage:
        'Kaupdagur er á undan síðasta kaupdegi, breyta þarf kaupdegi áður en eigendaskipti fara fram.',
      description: 'Message for validation error no 2',
    },
    E43: {
      id: 'ta.tvo.application:applicationCheck.validation.E43',
      defaultMessage:
        'Ökutækið er afskráð týnt, endurskrá þarf ökutækið áður en eigendaskipti eru framkvæmd.',
      description: 'Message for validation error no 43',
    },
    E47: {
      id: 'ta.tvo.application:applicationCheck.validation.E47',
      defaultMessage:
        'Ekki má hafa eigandaskipti á ökutæki sem hefur verið skráð til úrvinnslu',
      description: 'Message for validation error no 47',
    },
    E48: {
      id: 'ta.tvo.application:applicationCheck.validation.E48',
      defaultMessage:
        'Ökutæki með ferðaþjónustuleyfi, þarf að fara í breytingaskoðun og breyta í almenna notkun fyrir sölu.',
      description: 'Message for validation error no 48',
    },
    E49: {
      id: 'ta.tvo.application:applicationCheck.validation.E49',
      defaultMessage:
        'Ökutæki í ökutækjaleigu og með ferðaþjónustuleyfi, þarf að fara í breytingaskoðun og breyta í almenna notkun fyrir sölu.',
      description: 'Message for validation error no 49',
    },
    E50: {
      id: 'ta.tvo.application:applicationCheck.validation.E50',
      defaultMessage:
        'Ökutæki með ferðaþjónustuleyfi, þarf að fara í breytingaskoðun og breyta í almenna notkun fyrir sölu.',
      description: 'Message for validation error no 50',
    },
    E58: {
      id: 'ta.tvo.application:applicationCheck.validation.E58',
      defaultMessage:
        'Eigendaskiptaálestur hefur ekki farið fram innan sjö daga, lesa þarf af ökutækinu',
      description: 'Message for validation error no 58',
    },
    E61: {
      id: 'ta.tvo.application:applicationCheck.validation.E61',
      defaultMessage:
        'Kaupandi er ekki fjárráða, þarf að óska eftir leyfi sýslumanns. Ekki hægt að gera rafræn eigendaskipti',
      description: 'Message for validation error no 61',
    },
    E62: {
      id: 'ta.tvo.application:applicationCheck.validation.E62',
      defaultMessage:
        'Seljandi er ekki fjárráða, þarf að óska eftir leyfi sýslumanns. Ekki hægt að gera rafræn eigendaskipti',
      description: 'Message for validation error no 62',
    },
    E63: {
      id: 'ta.tvo.application:applicationCheck.validation.E63',
      defaultMessage:
        'Ökutækið er á sendiráðsmerkjum, setja þarf ökutækið á almenn merki fyrir sölu',
      description: 'Message for validation error no 63',
    },
    E64: {
      id: 'ta.tvo.application:applicationCheck.validation.E64',
      defaultMessage:
        'Ökutækið er skráð í neyðarakstur, þarf að fara í breytingaskoðun og setja í almenna notkun fyrir sölu.',
      description: 'Message for validation error no 64',
    },
    E66: {
      id: 'ta.tvo.application:applicationCheck.validation.E66',
      defaultMessage:
        'Skráður er rétthafi af fornmerkjum, ef merkið á að fylgja bílnum þarf rétthafinn að framvísa því til kaupanda. Ekki hægt að gera rafræn eigendaskipti.',
      description: 'Message for validation error no 66',
    },
    E67: {
      id: 'ta.tvo.application:applicationCheck.validation.E67',
      defaultMessage:
        'Eigendaskiptaálestur fór fram í dag, ekki hægt að gera eigendaskipti samdægurs vegna álagningar þungaskatts.',
      description: 'Message for validation error no 67',
    },
    E68: {
      id: 'ta.tvo.application:applicationCheck.validation.E68',
      defaultMessage:
        'Eigendaskiptaálestur hefur ekki farið fram innan sjö daga, lesa þarf af ökutækinu',
      description: 'Message for validation error no 68',
    },
    E69: {
      id: 'ta.tvo.application:applicationCheck.validation.E69',
      defaultMessage:
        'Eigendaskiptaálestur hefur ekki farið fram innan sjö daga, lesa þarf af ökutækinu',
      description: 'Message for validation error no 69',
    },
    E70: {
      id: 'ta.tvo.application:applicationCheck.validation.E70',
      defaultMessage:
        'Ökutæki með ferðaþjónustuleyfi, þarf að fara í breytingaskoðun og breyta í almenna notkun fyrir sölu.',
      description: 'Message for validation error no 70',
    },
    E71: {
      id: 'ta.tvo.application:applicationCheck.validation.E71',
      defaultMessage:
        'Ökutæki í ökutækjaleigu og með ferðaþjónustuleyfi, þarf að fara í breytingaskoðun og breyta í almenna notkun fyrir sölu.',
      description: 'Message for validation error no 71',
    },
    E72: {
      id: 'ta.tvo.application:applicationCheck.validation.E72',
      defaultMessage:
        'Ökutæki með ferðaþjónustuleyfi, þarf að fara í breytingaskoðun og breyta í almenna notkun fyrir sölu.',
      description: 'Message for validation error no 72',
    },
    E74: {
      id: 'ta.tvo.application:applicationCheck.validation.E74',
      defaultMessage:
        'Ökutæki í ökutækjaleigu og með ferðaþjónustuleyfi, þarf að fara í breytingaskoðun og breyta í almenna notkun fyrir sölu.',
      description: 'Message for validation error no 74',
    },
    E78: {
      id: 'ta.tvo.application:applicationCheck.validation.E78',
      defaultMessage:
        'Ekki er hægt að framkvæma eigandaskipti af ökutæki í flokknum ökutækjaleiga nema ökutækið hafi farið í aðalskoðun á almanaksárinu. Þarf að fara með ökutækið í skoðun fyrir sölu.',
      description: 'Message for validation error no 78',
    },
    E81: {
      id: 'ta.tvo.application:applicationCheck.validation.E81',
      defaultMessage:
        'Ökutækið verður að hafa farið í skoðun á árinu til að hægt sé að selja það.',
      description: 'Message for validation error no 81',
    },
    L1: {
      id: 'ta.tvo.application:applicationCheck.validation.L1',
      defaultMessage: 'Lás á ökutæki, hafið samband við Samgöngustofu',
      description: 'Message for lock error no 1',
    },
    L2: {
      id: 'ta.tvo.application:applicationCheck.validation.L2',
      defaultMessage: 'Lás á ökutæki, hafið samband við Samgöngustofu',
      description: 'Message for lock error no 2',
    },
    L4: {
      id: 'ta.tvo.application:applicationCheck.validation.L4',
      defaultMessage: 'Lás á ökutæki, hafið samband við Samgöngustofu',
      description: 'Message for lock error no 4',
    },
    L5: {
      id: 'ta.tvo.application:applicationCheck.validation.L5',
      defaultMessage: 'Lás á ökutæki, hafið samband við Samgöngustofu',
      description: 'Message for lock error no 5',
    },
    L6: {
      id: 'ta.tvo.application:applicationCheck.validation.L6',
      defaultMessage: 'Lás á ökutæki, hafið samband við Samgöngustofu',
      description: 'Message for lock error no 6',
    },
    L10: {
      id: 'ta.tvo.application:applicationCheck.validation.L10',
      defaultMessage:
        'Taka þarf einkamerki af ökutæki áður en eigendaskipti fara fram',
      description: 'Message for lock error no 10',
    },
  }),
}
