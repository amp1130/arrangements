"use client";

import { useState } from "react";
import arrangements from "../data/arrangements.json";
import Link from "next/link";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState("");

  // Get all unique instruments
  const allInstruments = Array.from(
    new Set(arrangements.flatMap(a => a.instruments))
  );

  // Filter arrangements
  const filteredArrangements = arrangements.filter((arrangement) => {
    const matchesSearch = arrangement.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInstrument = selectedInstrument
      ? arrangement.instruments.includes(selectedInstrument)
      : true;
    return matchesSearch && matchesInstrument;
  });

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-500">🎵 My Arrangements</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 mb-6 rounded-xl border border-gray-700 bg-gray-800 text-white"
      />

      {/* Instrument Filter */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={() => setSelectedInstrument("")}
          className={`px-4 py-2 rounded-full ${selectedInstrument === "" ? "bg-indigo-500 text-white" : "bg-gray-700 text-gray-300"}`}
        >
          All Instruments
        </button>
        {allInstruments.map((instrument) => (
          <button
            key={instrument}
            onClick={() => setSelectedInstrument(instrument)}
            className={`px-4 py-2 rounded-full ${selectedInstrument === instrument ? "bg-indigo-500 text-white" : "bg-gray-700 text-gray-300"}`}
          >
            {instrument}
          </button>
        ))}
      </div>

      {/* Arrangement Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredArrangements.map((arrangement) => (
          <Link key={arrangement.slug} href={`/arrangements/${arrangement.slug}`} className="block">
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
              {arrangement.coverImage && (
                <div className="w-full aspect-square overflow-hidden rounded-lg mb-4 relative group">
                  <img 
                    src={arrangement.coverImage} 
                    alt={arrangement.title} 
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>
              )}
              <h2 className="text-2xl font-semibold text-gray-800">{arrangement.title}</h2>
              <p className="text-gray-700">{arrangement.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
