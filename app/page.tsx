"use client";

import { useState, useMemo } from "react";
import arrangements from "../data/arrangements.json";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState("");

  const allInstruments = useMemo(
    () => Array.from(new Set(arrangements.flatMap((a) => a.instruments))),
    []
  );

  const filteredArrangements = arrangements.filter((arrangement) => {
    const matchesSearch = arrangement.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesInstrument = selectedInstrument
      ? arrangement.instruments.includes(selectedInstrument)
      : true;
    return matchesSearch && matchesInstrument;
  });

  return (
    <>
      <Head>
        {/* SEO and social meta */}
        <title>Arrangements</title>
        <meta name="description" content="Search and browse custom horn arrangements." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Arrangements" />
        <meta property="og:description" content="Browse my collection of horn arrangements." />
        <meta property="og:image" content="/images/Green%20Horn.jpg" />
        <meta property="og:url" content="https://arrangements-alpha.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative min-h-screen text-gray-900 p-6 md:p-8">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/green-gradient.jpg')",
            transform: "scaleX(-1)",
          }}
        />

        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/images/Green%20Horn.jpg"
              alt="Green Horn logo"
              className="h-12 w-auto rounded shadow-md"
            />
            <div>
              <h1 className="text-4xl font-extrabold text-green-700 tracking-tight">
                Arrangements
              </h1>
              <p className="text-gray-700 text-lg">
                Explore my collection of horn arrangements.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <label htmlFor="search" className="sr-only">Search arrangements</label>
          <input
            id="search"
            type="text"
            aria-label="Search by title"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400"
          />

          {/* Instrument Filter */}
          <div className="flex gap-2 flex-wrap mb-8" role="radiogroup" aria-label="Filter by instrument">
            <button
              onClick={() => setSelectedInstrument("")}
              aria-pressed={selectedInstrument === ""}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                selectedInstrument === ""
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Instruments
            </button>
            {allInstruments.map((instrument) => (
              <button
                key={instrument}
                onClick={() => setSelectedInstrument(instrument)}
                aria-pressed={selectedInstrument === instrument}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  selectedInstrument === instrument
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {instrument}
              </button>
            ))}
          </div>

          {/* Arrangement Grid or Empty Message */}
          {filteredArrangements.length === 0 ? (
            <p className="text-gray-500 italic">No arrangements found.</p>
          ) : (
            <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredArrangements.map((arrangement) => (
                <Link
                  key={arrangement.slug}
                  href={`/arrangements/${arrangement.slug}`}
                  className="block"
                >
                  <div className="p-4 bg-white rounded-2xl shadow transition-transform transform hover:scale-[1.02] border border-gray-200">
                    {arrangement.coverImage && (
                      <div className="w-full aspect-[4/3] overflow-hidden rounded-md mb-3 relative group">
                        <img
                          src={arrangement.coverImage}
                          alt={arrangement.title}
                          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                      </div>
                    )}
                    <h2 className="text-base font-semibold text-gray-900 truncate">
                      {arrangement.title}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {arrangement.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
