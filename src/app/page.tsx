"use client";

import { useState, useEffect } from "react";

type StreamData = {
  [key: string]: string;
};

export default function Home() {
  const [streamData, setStreamData] = useState<StreamData>({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/json_data/stream.json");
      const data = await response.json();
      setStreamData(data.stream);
    };

    fetchData();
  }, []);

  const filteredServices = Object.entries(streamData).filter(([service]) =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Streaming Services</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="サービスを検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ul className="space-y-2">
        {filteredServices.map(([service, url]) => (
          <li
            key={service}
            className="hover:bg-gray-100 hover:text-black p-2 rounded"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              {service}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
