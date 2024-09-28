import Head from 'next/head'
import TimelineGame from '../components/TimelineGame'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Historical Timeline Game</title>
        <meta name="description" content="Test your knowledge of historical events with our timeline game!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4">
        <TimelineGame />
      </main>
    </div>
  )
}