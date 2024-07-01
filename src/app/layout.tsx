import { colors } from '@/utils/colors'
import { Box } from '@mui/material'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MEF APP',
  description: 'A powerful web application meticulously crafted to seamlessly organize and manage the biodata of Moch Edris\'s extensive family members.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            maxWidth: '500px',
            background: '#18181b',
            color: colors.green[50],
            overflowY: 'auto'
          }}
        >
          {children}
        </Box>
      </body>
    </html>
  )
}
