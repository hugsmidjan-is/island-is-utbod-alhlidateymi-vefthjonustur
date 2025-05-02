import { useMutation } from '@apollo/client'
import initApollo from '../../../../graphql/client'
import { SUB_POST_EMAIL } from '../../../../graphql/queries.graphql'
import { useLogIn, useUser } from '../../../../hooks'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { useFetchEmail } from '../../../../hooks/api/useFetchEmail'
import { LoadingDots, toast } from '@island.is/island-ui/core'
import { useRouter } from 'next/router'
import localization from '../../Subscriptions.json'
import { ActionCard } from '../../../../components'

interface EmailBoxProps {
  email: string
  emailVerified: boolean
  getUserEmailLoading: boolean
}

const emailIsValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const EmailBox = ({
  email,
  emailVerified,
  getUserEmailLoading,
}: EmailBoxProps) => {
  const loc = localization['emailBox']
  const { isAuthenticated, userLoading } = useUser()
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const LogIn = useLogIn()
  const [userEmail, setUserEmail] = useState('')
  const [inputVal, setInputVal] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const client = initApollo()
  const [postEmailMutation, { loading: postEmailLoading }] = useMutation(
    SUB_POST_EMAIL,
    {
      client: client,
    },
  )
  const router = useRouter()

  useEffect(() => {
    if (!getUserEmailLoading) {
      setUserEmail(email)
      setIsVerified(emailVerified)
      setIsLoading(false)
    }
    return () => setIsLoading(true)
  }, [getUserEmailLoading])

  const onChangeEmail = (e: BaseSyntheticEvent) => {
    const nextInputVal = e.target.value
    setInputVal(nextInputVal)
  }

  const onSetEmail = async () => {
    const nextEmail = inputVal
    await postEmailMutation({
      variables: {
        input: { email: nextEmail },
      },
    })
      .then(() => {
        toast.success(`${loc.postEmailMutationToasts.success} ${nextEmail}`)
        setUserEmail(nextEmail)
      })
      .catch((e) => {
        console.error(e)
        toast.error(loc.postEmailMutationToasts.failure)
      })
  }

  const resetEmail = () => {
    const nextInputVal = ''
    setInputVal(nextInputVal)
    setUserEmail(nextInputVal)
    setIsVerified(false)
  }

  if (isLoading) {
    return <LoadingDots />
  }

  if (!userLoading && !isAuthenticated) {
    return (
      <ActionCard
        heading={loc.loginActionCard.heading}
        text={loc.loginActionCard.text}
        button={[
          {
            label: loc.loginActionCard.buttonLabel,
            onClick: LogIn,
          },
        ]}
      />
    )
  }

  if (!userLoading && isAuthenticated && !userEmail) {
    return (
      <ActionCard
        heading={loc.setEmailActionCard.heading}
        input={{
          name: 'subscriptionEmail',
          label: loc.setEmailActionCard.input.label,
          placeholder: loc.setEmailActionCard.input.placeholder,
          value: inputVal,
          onChange: onChangeEmail,
        }}
        button={[
          {
            label: loc.setEmailActionCard.buttonLabel,
            onClick: onSetEmail,
            disabled: !emailIsValid(inputVal),
            isLoading: postEmailLoading,
          },
        ]}
      />
    )
  }

  return isVerified ? (
    <ActionCard
      text={`${loc.verifiedActionCard.text}: ${userEmail}`}
      button={[
        {
          label: loc.verifiedActionCard.resetButtonLabel,
          onClick: resetEmail,
        },
        {
          label: loc.verifiedActionCard.mySubscriptionsButton.label,
          onClick: () =>
            router.push(loc.verifiedActionCard.mySubscriptionsButton.href),
        },
      ]}
    />
  ) : (
    <ActionCard
      text={`${loc.notVerifiedActionCard.text} ${userEmail}`}
      button={[
        {
          label: loc.notVerifiedActionCard.buttonLabel,
          onClick: resetEmail,
        },
      ]}
    />
  )
}
export default EmailBox
