import Head from 'next/head'
import TimelineGame from '../components/TimelineGame'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Historical Timeline Game</title>
        <meta name="description" content="Test your knowledge of historical events with our timeline game!" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <main className="flex-grow w-full">
        <TimelineGame />
      </main>
    </div>
  )
}