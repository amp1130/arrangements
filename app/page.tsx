"use client";

import { useState } from "react";
import arrangements from "../data/arrangements.json";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState("");

  const allInstruments = Array.from(
    new Set(arrangements.flatMap((a) => a.instruments))
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
        {/* Metadata for social sharing and SEO */}
        <meta property="og:title" content="Arrangements" />
        <meta property="og:description" content="Browse my collection of musical arrangements." />
        <meta property="og:image" content="/images/Green%20Horn.jpg" />
        <meta property="og:url" content="https://arrangements-alpha.vercel.app/" />
        <title>Arrangements</title>
      </Head>
      
      <main className="relative min-h-screen text-gray-900 p-6 md:p-8">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/green-gradient.jpg')", transform: "scaleX(-1)" }} />

        {/* Main content */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <img
              src="/images/Green%20Horn.jpg"
              alt="Green Horn Logo"
              className="h-12 w-auto rounded shadow-md"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-green-700">
              Arrangements
            </h1>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 mb-5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400"
          />

          {/* Instrument Filter */}
          <div className="flex gap-2 flex-wrap mb-6">
            <button
              onClick={() => setSelectedInstrument("")}
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

          {/* Arrangement Cards */}
          <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredArrangements.map((arrangement) => (
              <Link
                key={arrangement.slug}
                href={`/arrangements/${arrangement.slug}`}
                className="block"
              >
                <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200">
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
        </div>
      </main>
    </>
  );
}
