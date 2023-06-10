import './globals.css'
import { Public_Sans } from 'next/font/google'
import localFont from 'next/font/local';

const inter = Public_Sans({ subsets: ['latin'] })

export const spartan = localFont({
  src:[
    {
      path: "../../public/fonts/Spartan-ExtraBold.ttf",
      weight: '800',
      style: 'normal',
    },
  ]})



export const metadata = {
  title: 'Simon H',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  )
}
