import arrangements from "../../../data/arrangements.json";
import Link from "next/link";
import Head from "next/head";

export type paramsType = Promise<{ slug: string }>;

// Fetching arrangement data directly in the component
export default async function ArrangementPage(props: { params: paramsType }) {
  // Await params to ensure correct handling
  const { slug } = await props.params;

  // Find the arrangement that matches the slug
  const arrangement = arrangements.find((a) => a.slug === slug);

  if (!arrangement) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f9fafb] p-8">
        <div className="text-center text-gray-600 text-xl">Arrangement not found.</div>
      </main>
    );
  }

  return (
    <>
      <Head>
        {/* Metadata for social sharing and SEO */}
        <meta property="og:title" content={arrangement.title} />
        <meta property="og:description" content={arrangement.description} />
        <meta property="og:image" content={arrangement.coverImage || "/images/Green%20Horn.jpg"} />
        <meta property="og:url" content={`https://arrangements-alpha.vercel.app/arrangements/${arrangement.slug}`} />
        <title>{arrangement.title}</title>
      </Head>

      <main className="relative min-h-screen bg-cover bg-center p-8 text-gray-900">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/green-gradient.jpg')", transform: "scaleX(-1)" }} />

        {/* Main content */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Back Button */}
          <Link href="/" className="text-green-600 hover:underline flex items-center space-x-2">
            <span className="text-2xl">&larr;</span>
            <span>Back to Home</span>
          </Link>

          {/* Title & Description */}
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-gray-900">{arrangement.title}</h1>
            <p className="text-lg text-gray-600">{arrangement.description}</p>
          </div>

          {/* Audio Player */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <audio controls className="w-full">
              <source src={arrangement.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* Full Score */}
          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-gray-800">🎼 Full Score</h2>
            <div className="flex gap-4">
              <a
                href={arrangement.fullScore}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-medium underline"
              >
                View Full Score
              </a>
              <a
                href={arrangement.fullScore}
                download
                className="text-green-600 font-medium underline"
              >
                Download Full Score
              </a>
            </div>
          </section>

          {/* Parts */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-gray-800">🎶 Parts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {arrangement.parts.map((part, index) => (
                <div key={index} className="p-4 bg-white rounded-xl shadow-md flex flex-col items-start">
                  <span className="font-semibold text-gray-700 mb-2">{part.name}</span>
                  <div className="flex gap-4 text-green-600 text-sm">
                    <a href={part.url} target="_blank" rel="noopener noreferrer" className="underline">
                      View
                    </a>
                    <a href={part.url} download className="underline">
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
