import Head from 'next/head'
import { IntlProvider } from 'react-intl'
import { Provider } from 'reakit'
import { Header } from '@hxm/ui/components/Header/Header'
import { PageLoader } from '@hxm/ui/components/PageLoader/PageLoader'

import { Footer, Page, ToastContainer } from '@island.is/island-ui/core'

import { Routes } from '../lib/constants'

export type LayoutProps = {
  showFooter?: boolean
  children?: React.ReactNode
}

export const Layout = ({ children, showFooter = false }: LayoutProps) => {
  const preloadedFonts = [
    '/fonts/ibm-plex-sans-v7-latin-300.woff2',
    '/fonts/ibm-plex-sans-v7-latin-regular.woff2',
    '/fonts/ibm-plex-sans-v7-latin-italic.woff2',
    '/fonts/ibm-plex-sans-v7-latin-500.woff2',
    '/fonts/ibm-plex-sans-v7-latin-600.woff2',
  ]

  return (
    <IntlProvider
      locale="is"
      defaultLocale="is"
      messages={{}}
      onError={(err) => {
        // Chrome only ships with 'en' formatters for NumberFormat and DateTimeFormat.
        // Ignore these errors since we're not using these formatters.
        // Bundling polyfills for 'is' significantly increases bundle size and provides no gain.
        // See: https://app.asana.com/0/1202453499137756/1204509391926816
        if (err.code === 'MISSING_DATA') {
          return null
        }

        // eslint-disable-next-line no-console
        console.error('Error in IntlProvider', { exception: err })
      }}
    >
      <Provider>
        <PageLoader />
        <Page component="div">
          <Head>
            {preloadedFonts.map((href, index) => {
              return (
                <link
                  key={index}
                  rel="preload"
                  href={href}
                  as="font"
                  type="font/woff2"
                  crossOrigin="anonymous"
                />
              )
            })}
          </Head>
          <Header
            controlPanel={{
              title: 'Lögbirtingarblaðið',
              paths: Routes,
            }}
          />
          <main>
            {children}
            <ToastContainer />
          </main>
          {showFooter && <Footer />}
          <style jsx global>{`
            @font-face {
              font-family: 'IBM Plex Sans';
              font-style: normal;
              font-weight: 300;
              font-display: swap;
              src:
                local('IBM Plex Sans Light'),
                local('IBMPlexSans-Light'),
                url('/fonts/ibm-plex-sans-v7-latin-300.woff2') format('woff2'),
                url('/fonts/ibm-plex-sans-v7-latin-300.woff') format('woff');
            }
            @font-face {
              font-family: 'IBM Plex Sans';
              font-style: normal;
              font-weight: 400;
              font-display: swap;
              src:
                local('IBM Plex Sans'),
                local('IBMPlexSans'),
                url('/fonts/ibm-plex-sans-v7-latin-regular.woff2')
                  format('woff2'),
                url('/fonts/ibm-plex-sans-v7-latin-regular.woff') format('woff');
            }
            @font-face {
              font-family: 'IBM Plex Sans';
              font-style: italic;
              font-weight: 400;
              font-display: swap;
              src:
                local('IBM Plex Sans Italic'),
                local('IBMPlexSans-Italic'),
                url('/fonts/ibm-plex-sans-v7-latin-italic.woff2')
                  format('woff2'),
                url('/fonts/ibm-plex-sans-v7-latin-italic.woff') format('woff');
            }
            @font-face {
              font-family: 'IBM Plex Sans';
              font-style: normal;
              font-weight: 500;
              font-display: swap;
              src:
                local('IBM Plex Sans Medium'),
                local('IBMPlexSans-Medium'),
                url('/fonts/ibm-plex-sans-v7-latin-500.woff2') format('woff2'),
                url('/fonts/ibm-plex-sans-v7-latin-500.woff') format('woff');
            }
            @font-face {
              font-family: 'IBM Plex Sans';
              font-style: normal;
              font-weight: 600;
              font-display: swap;
              src:
                local('IBM Plex Sans SemiBold'),
                local('IBMPlexSans-SemiBold'),
                url('/fonts/ibm-plex-sans-v7-latin-600.woff2') format('woff2'),
                url('/fonts/ibm-plex-sans-v7-latin-600.woff') format('woff');
            }
          `}</style>
        </Page>
      </Provider>
    </IntlProvider>
  )
}
