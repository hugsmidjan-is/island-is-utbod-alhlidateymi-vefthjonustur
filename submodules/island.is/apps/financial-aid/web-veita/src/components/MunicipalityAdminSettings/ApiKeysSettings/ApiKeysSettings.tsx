import React from 'react'
import { Box, Button } from '@island.is/island-ui/core'

import { ApiKeysForMunicipality } from '@island.is/financial-aid/shared/lib'
import CreateApiKeyModal from '../ApiKeyModal/CreateApiKeyModal'
import UpdateApiKeyModal from '../ApiKeyModal/UpdateApiKeyModal'
import useApiKeys from '@island.is/financial-aid-web/veita/src/utils/useApiKeys'

interface Props {
  apiKeyInfo?: ApiKeysForMunicipality
  code: string
  setCurrentState: (ApiKeyInfo?: ApiKeysForMunicipality) => void
}

const ApiKeysSettings = ({ apiKeyInfo, code, setCurrentState }: Props) => {
  const {
    isModalVisable,
    setIsModalVisable,
    createApiKeyForMunicipality,
    updateApiKeyForMunicipality,
    deleteApiKeyForMunicipality,
  } = useApiKeys(setCurrentState)

  if (apiKeyInfo) {
    return (
      <>
        <Box display="flex">
          <Button
            size="small"
            icon="add"
            variant="ghost"
            onClick={() => setIsModalVisable(true)}
          >
            Uppfæra lykil
          </Button>
          <Box marginLeft={2}>
            <Button
              onClick={() =>
                deleteApiKeyForMunicipality(
                  apiKeyInfo.id,
                  apiKeyInfo.municipalityCode,
                )
              }
              icon="close"
              size="small"
              variant="primary"
              colorScheme="destructive"
            >
              Eyða lykli
            </Button>
          </Box>
        </Box>

        <UpdateApiKeyModal
          isVisible={isModalVisable}
          setIsVisible={(isModalVisible) => {
            setIsModalVisable(isModalVisible)
          }}
          name={apiKeyInfo.name}
          apiKey={apiKeyInfo.apiKey}
          onSubmit={(name) => updateApiKeyForMunicipality(apiKeyInfo.id, name)}
        />
      </>
    )
  } else {
    return (
      <>
        <Button
          size="small"
          icon="pencil"
          variant="ghost"
          onClick={() => setIsModalVisable(true)}
        >
          Búa til lykil
        </Button>
        <CreateApiKeyModal
          isVisible={isModalVisable}
          setIsVisible={(isModalVisible) => {
            setIsModalVisable(isModalVisible)
          }}
          onSubmit={(name, key) => createApiKeyForMunicipality(name, key, code)}
        />
      </>
    )
  }
}

export default ApiKeysSettings
