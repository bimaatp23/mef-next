import { Box, colors } from '@mui/material'
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
        <Box sx={{ background: colors.teal[900], height: '100vh' }}>
          {children}
        </Box>
      </body>
    </html>
  )
}
