import arrangements from "../../../data/arrangements.json";
import Link from "next/link";
import Head from "next/head";
import { Eye, Download, Music, BookOpenText } from "lucide-react";

export type paramsType = Promise<{ slug: string }>;

export default async function ArrangementPage(props: { params: paramsType }) {
  const { slug } = await props.params;
  const arrangement = arrangements.find((a) => a.slug === slug);

  if (!arrangement) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f9fafb] p-8">
        <div className="text-center text-gray-600 text-xl" role="alert">
          Arrangement not found.
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{arrangement.title}</title>
        <meta name="description" content={arrangement.description} />
        <meta property="og:title" content={arrangement.title} />
        <meta property="og:description" content={arrangement.description} />
        <meta
          property="og:image"
          content={arrangement.coverImage || "/images/Green%20Horn.jpg"}
        />
        <meta
          property="og:url"
          content={`https://arrangements-alpha.vercel.app/arrangements/${arrangement.slug}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative min-h-screen bg-cover bg-center p-6 md:p-10 text-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/green-gradient.jpg')",
            transform: "scaleX(-1)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto space-y-10 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <Link
            href="/"
            className="inline-flex items-center text-green-700 font-medium hover:underline"
            aria-label="Go back to home page"
          >
            <span className="text-xl mr-2">&larr;</span>
            Back to Home
          </Link>

          <header className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              {arrangement.title}
            </h1>
            <p className="text-lg text-gray-700">{arrangement.description}</p>
          </header>

          <section aria-label="Audio preview">
            <audio controls className="w-full">
              <source src={arrangement.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </section>

          <section className="space-y-3" aria-label="Full score">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="inline-flex gap-1 text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">
                <BookOpenText/> Full Score
              </h2>
              <div className="flex gap-4 flex-wrap justify-end">
                <a
                  href={arrangement.fullScore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-700 text-white text-sm font-semibold hover:bg-green-800 transition"
                >
                  <Eye size={16} /> View Full Score
                </a>
                <a
                  href={arrangement.fullScore}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-700 text-white text-sm font-semibold hover:bg-green-800 transition"
                >
                  <Download size={16} /> Download Full Score
                </a>
              </div>
            </div>
          </section>

          <section className="space-y-4" aria-label="Individual instrument parts">
            <h2 className="inline-flex gap-1 text-2xl font-semibold text-gray-800"> <Music /> Parts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {arrangement.parts.map((part, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-700">{part.name}</span>
                  <div className="flex gap-2">
                    <a
                      href={part.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-700 text-white text-sm font-medium hover:bg-green-800 transition"
                    >
                      <Eye size={16} /> View
                    </a>
                    <a
                      href={part.url}
                      download
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-700 text-white text-sm font-medium hover:bg-green-800 transition"
                    >
                      <Download size={16} /> Download
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
