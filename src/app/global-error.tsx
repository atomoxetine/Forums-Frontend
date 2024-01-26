'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>{error.name}</h2>
        <h5>An error has occurred!</h5>
        <h5>Message: {error.message}</h5>
        <h5>Caused by: {(error?.cause as any).toString()}</h5>
        <small>Stack: {error.stack}</small>
        <button onClick={() => reset()}>Try again?</button>
      </body>
    </html>
    )
}