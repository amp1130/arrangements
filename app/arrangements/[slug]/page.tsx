import arrangements from "../../../data/arrangements.json";
import Link from "next/link";

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
    <main className="min-h-screen bg-[#f9fafb] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
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

        {/* Download MP3 */}
        <div>
          <a
            href={arrangement.audio}
            download
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition"
          >
            ⬇️ Download MP3
          </a>
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
  );
}
