import './globals.css'
import { Toaster } from 'react-hot-toast'


export const metadata = {
  title: 'Catalogd',
  description: 'Your favorite games, all in one place.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
  
}