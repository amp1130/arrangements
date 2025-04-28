import arrangements from "../../../data/arrangements.json";
import Link from "next/link";

export default function ArrangementPage({ params }: { params: { slug: string } }) {
  const arrangement = arrangements.find((a) => a.slug === params.slug);

  if (!arrangement) {
    return <div className="p-8">Arrangement not found.</div>;
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <Link href="/" className="text-blue-500 hover:underline">&larr; Back</Link>

      <h1 className="text-4xl font-bold mt-4 mb-2">{arrangement.title}</h1>
      <p className="text-gray-700 mb-8">{arrangement.description}</p>

      {/* Audio Player */}
      <audio controls className="mb-6 w-full">
        <source src={arrangement.audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Download MP3 */}
      <a
        href={arrangement.audio}
        download
        className="block mb-6 bg-blue-500 text-white p-4 rounded-xl hover:bg-blue-600 transition w-fit"
      >
        Download MP3
      </a>

      {/* Full Score */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-2">Full Score:</h2>
        <a
          href={arrangement.fullScore}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View Full Score
        </a>{" "}
        |{" "}
        <a
          href={arrangement.fullScore}
          download
          className="text-blue-600 underline"
        >
          Download Full Score
        </a>
      </div>

      {/* Parts */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Parts:</h2>
        {arrangement.parts.map((part, index) => (
          <div key={index} className="mb-2">
            <a
              href={part.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mr-4"
            >
              View {part.name}
            </a>
            |
            <a
              href={part.url}
              download
              className="text-blue-600 underline ml-4"
            >
              Download {part.name}
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
