import React from 'react'
import {
  Text,
  Box,
  Input,
  Button,
  ToastContainer,
  Checkbox,
  RadioButton,
} from '@island.is/island-ui/core'

import {
  AidName,
  ApiKeysForMunicipality,
  ChildrenAid,
  Municipality,
} from '@island.is/financial-aid/shared/lib'
import MunicipalityNumberInput from './MunicipalityNumberInput/MunicipalityNumberInput'
import {
  PercentageInput,
  SelectedMunicipality,
} from '@island.is/financial-aid-web/veita/src/components'
import useCurrentMunicipalityState from '@island.is/financial-aid-web/veita/src/utils/useCurrentMunicipalityState'
import ApiKeysSettings from './ApiKeysSettings/ApiKeysSettings'
import ApiKeyInfo from './ApiKeysSettings/ApiKeysInfo'
import { useErrorInSettings } from '../../utils/useErrorInSettings'

interface Props {
  currentMunicipality: Municipality
}

const MunicipalityAdminSettings = ({ currentMunicipality }: Props) => {
  const { state, setState, loading, updateMunicipality } =
    useCurrentMunicipalityState({
      municipality: currentMunicipality,
    })

  const { apiKeyInfo, municipalityId } = state

  const INDIVIDUAL = 'individual'
  const COHABITATION = 'cohabitation'
  const aidNames = Object.values(AidName).map(String)

  const {
    hasNavError,
    hasAidError,
    hasDecemberCompensationError,
    errorCheckNav,
    errorCheckAid,
    errorCheckDecemberCompensation,
    aidChangeHandler,
    navChangeHandler,
  } = useErrorInSettings(aidNames)

  const submit = () => {
    const errorNav = errorCheckNav(state)
    const errorAid =
      errorCheckAid(state.individualAid, INDIVIDUAL, !errorNav) ||
      errorCheckAid(state.cohabitationAid, COHABITATION, !errorNav)
    const errorDesember = errorCheckDecemberCompensation(
      state.decemberCompensation,
    )

    if (errorNav || errorAid || errorDesember) {
      return
    }
    updateMunicipality()
  }

  //This is because of animation on select doesnt work stand alone
  const navAndMultiSelectContent = [
    {
      headline: 'Veldu sveitarfélag til að breyta stillingum',
      component: (
        <SelectedMunicipality
          currentMunicipality={state}
          onStateUpdate={(muni: Municipality) => {
            setState(muni)
          }}
        />
      ),
    },
    {
      headline: 'Tenging við Navision',
      component: (
        <>
          <Box marginBottom={3} id="navSettings">
            <Checkbox
              name="usingNav"
              label="Virkja tengingu við Navision"
              checked={state.usingNav}
              onChange={(event) =>
                navChangeHandler(() => {
                  setState({
                    ...state,
                    usingNav: event.target.checked,
                  })
                })
              }
            />
          </Box>
          <Input
            label="Slóð"
            name="navUrl"
            value={state.navUrl ?? ''}
            backgroundColor="blue"
            hasError={hasNavError && !state.navUrl}
            disabled={!state.usingNav}
            onChange={(event) =>
              navChangeHandler(() => {
                setState({
                  ...state,
                  navUrl: event.currentTarget.value,
                })
              })
            }
          />
          <Text marginTop={1} marginBottom={3} variant="small">
            Þetta er slóð á vefþjónustu Navision sem þið fáið frá Wise þegar
            vefþjónustan hefur verið sett upp fyrir sveitafélagið.
          </Text>
          <Input
            label="Notendanafn"
            name="navUsername"
            value={state.navUsername ?? ''}
            backgroundColor="blue"
            hasError={hasNavError && !state.navUsername}
            disabled={!state.usingNav}
            onChange={(event) =>
              navChangeHandler(() => {
                setState({
                  ...state,
                  navUsername: event.currentTarget.value,
                })
              })
            }
          />
          <Text marginTop={1} marginBottom={3} variant="small">
            Þetta er notendanafn að Navision vefþjónustunni sem þið fáið frá
            Wise þegar vefþjónustan hefur verið sett upp fyrir sveitarfélagið.
          </Text>
          <Input
            label="Lykilorð"
            name="navPassword"
            value={state.navPassword ?? ''}
            backgroundColor="blue"
            hasError={hasNavError && !state.navPassword}
            disabled={!state.usingNav}
            autoComplete="off"
            onChange={(event) =>
              navChangeHandler(() => {
                setState({
                  ...state,
                  navPassword: event.currentTarget.value,
                })
              })
            }
          />
          <Text marginTop={1} marginBottom={3} variant="small">
            Þetta er lykilorð að Navision vefþjónustunni sem þið fáið frá Wise
            þegar vefþjónustan hefur verið sett upp fyrir sveitarfélagið.
          </Text>
        </>
      ),
    },
  ]

  const EmailSiteAidContent = [
    {
      headline: `Reglur um fjárhagsaðstoð ${state.name}`,
      smallText:
        'Þegar umsóknum er synjað er hlekkur á slóð um reglur um fjárhagsaðstoð sveitarfélagsins birtur í tölvupósti sem er sendur á umsækjanda.',
      component: (
        <Input
          label="Slóð"
          name="financialAidRules"
          value={state.rulesHomepage ?? ''}
          backgroundColor="blue"
          onChange={(event) =>
            setState({
              ...state,
              rulesHomepage: event.currentTarget.value,
            })
          }
        />
      ),
    },
    {
      headline: 'Almennt netfang sveitarfélagsins (félagsþjónusta)',
      smallText:
        'Ef ske kynni að tæknilegir örðugleikar yllu því að umsækjandi næði ekki að senda athugasemdir eða gögn í gegnum sína stöðusíðu þá er umsækjanda bent á að hægt sé að hafa samband með því að senda tölvupóst. Þá er þetta netfang birt umsækjanda til upplýsinga.',
      component: (
        <Input
          label="Netfang"
          name="municipalityEmail"
          value={state.email ?? ''}
          type="email"
          backgroundColor="blue"
          onChange={(event) =>
            setState({
              ...state,
              email: event.currentTarget.value,
            })
          }
        />
      ),
    },
    {
      headline: 'Vefur sveitarfélagsins',
      smallText:
        'Ef vísað er til þess að upplýsingar megi finna á vef sveitarfélagsins er notanda bent á þessa slóð.',
      component: (
        <Input
          label="Slóð"
          name="municipalityWeb"
          value={state.homepage ?? ''}
          backgroundColor="blue"
          onChange={(event) =>
            setState({
              ...state,
              homepage: event.currentTarget.value,
            })
          }
        />
      ),
    },
    {
      headline: 'Desember uppbót',
      smallText: 'Prósenta af grunnupphæð',
      component: (
        <PercentageInput
          id={`input-desember`}
          name={`decemberCompensation`}
          label="Desember uppbót"
          value={state.decemberCompensation.toString()}
          hasError={
            hasDecemberCompensationError && state.decemberCompensation === 0
          }
          errorMessage={'Desember uppbót þarf að vera hærri en 0'}
          onUpdate={(value) =>
            setState({
              ...state,
              decemberCompensation: value,
            })
          }
        />
      ),
    },
    {
      headline: 'Einstaklingar',
      component: Object.entries(state.individualAid).map(
        (aid) =>
          aidNames.includes(aid[0]) && (
            <MunicipalityNumberInput
              key={`${INDIVIDUAL}${aid[0]}`}
              id={aid[0]}
              aid={aid[1]}
              prefix={INDIVIDUAL}
              error={hasAidError}
              update={(value) =>
                aidChangeHandler(() =>
                  setState({
                    ...state,
                    individualAid: {
                      ...state.individualAid,
                      [aid[0]]: value,
                    },
                  }),
                )
              }
            />
          ),
      ),
    },
    {
      headline: 'Hjón/sambúð',
      component: Object.entries(state.cohabitationAid).map(
        (aid) =>
          aidNames.includes(aid[0]) && (
            <MunicipalityNumberInput
              key={`${COHABITATION}${aid[0]}`}
              id={aid[0]}
              aid={aid[1]}
              prefix={COHABITATION}
              error={hasAidError}
              update={(value) =>
                aidChangeHandler(() =>
                  setState({
                    ...state,
                    cohabitationAid: {
                      ...state.cohabitationAid,
                      [aid[0]]: value,
                    },
                  }),
                )
              }
            />
          ),
      ),
    },
  ]

  return (
    <Box marginTop={[5, 10, 15]} marginBottom={[5, 10, 15]}>
      <Box
        className={`contentUp`}
        marginBottom={[2, 2, 7]}
        display="flex"
        justifyContent="spaceBetween"
      >
        <Text as="h1" variant="h1">
          Sveitarfélagsstillingar
        </Text>

        <Button loading={loading} onClick={submit} icon="checkmark">
          Vista stillingar
        </Button>
      </Box>

      <Box className={`contentUp delay-25`}>
        {navAndMultiSelectContent.map((el, index) => {
          return (
            <Box
              marginBottom={[2, 2, 7]}
              key={`navAndMultiSelectContent-${index}`}
            >
              <Text
                as="h3"
                variant="h3"
                marginBottom={[2, 2, 3]}
                color="dark300"
              >
                {el.headline}
              </Text>
              {el.component}
            </Box>
          )
        })}
      </Box>
      <Box className={`contentUp`}>
        <Box marginBottom={[2, 2, 7]} id="apiKeySettings">
          <Box display="flex" justifyContent="spaceBetween" alignItems="center">
            <Text as="h3" variant="h3" marginBottom={[2, 2, 3]} color="dark300">
              Tenging við ytri kerfi
            </Text>
            <ApiKeysSettings
              apiKeyInfo={apiKeyInfo}
              code={municipalityId}
              setCurrentState={(ApiKeyInfo: ApiKeysForMunicipality) =>
                setState({ ...state, apiKeyInfo: ApiKeyInfo })
              }
            />
          </Box>
          <ApiKeyInfo apiKeyInfo={apiKeyInfo} />
        </Box>
      </Box>

      {EmailSiteAidContent.map((el, index) => {
        return (
          <Box
            marginBottom={[2, 2, 7]}
            className={`contentUp delay-25`}
            style={{ animationDelay: index * 10 + 30 + 'ms' }}
            key={`EmailSiteAidContent-${index}`}
          >
            <Text as="h3" variant="h3" marginBottom={[2, 2, 3]} color="dark300">
              {el.headline}
            </Text>
            {el.component}

            {el.smallText && (
              <Text marginTop={1} variant="small">
                {el.smallText}
              </Text>
            )}
          </Box>
        )
      })}

      <Box marginBottom={[2, 2, 7]} id="childrenAid" className={`contentUp`}>
        <Text as="h3" variant="h3" marginBottom={[2, 2, 3]} color="dark300">
          Börn
        </Text>
        <Box
          display="flex"
          alignItems="center"
          width="full"
          columnGap={3}
          rowGap={3}
          flexWrap={'wrap'}
        >
          <Box flexGrow={1}>
            <RadioButton
              name="children-aid-institution"
              label="Styrkur greiddur til stofnunar"
              value={ChildrenAid.INSTITUTION}
              checked={state.childrenAid === ChildrenAid.INSTITUTION}
              onChange={() => {
                setState({ ...state, childrenAid: ChildrenAid.INSTITUTION })
              }}
              backgroundColor="blue"
              large
            />
          </Box>
          <Box flexGrow={1}>
            <RadioButton
              name="children-aid-applicant"
              label="Styrkur greiddur til umsækjanda"
              value={ChildrenAid.APPLICANT}
              checked={state.childrenAid === ChildrenAid.APPLICANT}
              onChange={() => {
                setState({
                  ...state,
                  childrenAid: ChildrenAid.APPLICANT,
                })
              }}
              backgroundColor="blue"
              large
            />
          </Box>
        </Box>
      </Box>

      <Box display="flex" justifyContent="flexEnd">
        <Button loading={loading} onClick={submit} icon="checkmark">
          Vista stillingar
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  )
}

export default MunicipalityAdminSettings
