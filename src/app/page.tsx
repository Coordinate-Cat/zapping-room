import path from "path";
import fs from "fs";

async function getStreamData() {
  // JSONファイルのパスを取得
  const jsonPath = path.join(process.cwd(), "public/json_data/stream.json");

  // JSONファイルを読み込む
  const fileContent = fs.readFileSync(jsonPath, "utf8");

  // JSONをパースして返す
  return JSON.parse(fileContent).stream;
}

export default async function Home() {
  const streamData = await getStreamData();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Streaming Services</h1>
      <ul className="space-y-2">
        {Object.entries(streamData).map(([service, url]) => (
          <li
            key={service}
            className="hover:bg-gray-100 hover:text-black p-2 rounded"
          >
            <a
              href={url as string}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full" // リンクを幅いっぱいに表示
            >
              {service}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
