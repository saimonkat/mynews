import 'twin.macro'
import Header from '@/components/Header'
import Main from '@/components/Main'
import Theme from '@/contexts/ThemeProvider'
import StyledComponentsRegistry from '@/lib/registry'
import GlobalStyles from '@/styles/GlobalStyles'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s - MyNews',
    default: 'MyNews',
  },
  description: 'Customizable aggregator for news from around the world',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <body>
        <React.StrictMode>
          <StyledComponentsRegistry>
            <GlobalStyles />
            <Theme>
              <Header />
              <Main>{props.children}</Main>
            </Theme>
          </StyledComponentsRegistry>
        </React.StrictMode>
      </body>
    </html>
  )
}
