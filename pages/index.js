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

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Historical Timeline Game</h1>
        <TimelineGame />
      </main>
    </div>
  )
}