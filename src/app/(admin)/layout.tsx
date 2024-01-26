import './globals.css';
import type { Metadata } from 'next';


const title = 'MCCade - M.O.T.H.E.R.';
const description = 'Metrics Overview Tracking & Health Evaluation Reporting.';
export const metadata: Metadata = {
  title: title,
  description: description,
}
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    {children}
  )
}
//#region Metadata