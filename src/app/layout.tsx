import './globals.css';
import type { Metadata, ResolvingMetadata } from 'next';
import { Dosis } from 'next/font/google'

const dosis = Dosis({subsets: ["latin"], variable: "--font-dosis"});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dosis.variable}`}>
        {children}
      </body>
    </html>
  )
}

//#region Metadata
const url = new URL(process.env.NEXT_PUBLIC_CURR_DOMAIN || '');
const title = 'PinkCloud - Voyager';
const description = 'PinkCloud elevates your online presence with our professional website freelancers';
const images: string[] = [
  url.toString() + 'img/website_preview.png'
];
export const metadata: Metadata = {
  metadataBase: url,
  title: title,
  description: description,
  openGraph: {
    siteName: 'PinkCloud Studios',
    type: "website",
    emails: ['emily@pinkcloud.studio', 'elaina@pinkcloud.studio', 'nathan@pinkcloud.studio'],
    locale: 'en_GB',
    url: url,
    title: title,
    description: description,
    images: images
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@NekoElynn',
    title: title,
    description: description,
    images: images
  }
}
// type Props = {
//   params: { id: string }
//   searchParams: { [key: string]: string | string[] | undefined }
// }
// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   return {
//     ...metadata, // Write dynamic overrides here
//   }
// }
//#endregion