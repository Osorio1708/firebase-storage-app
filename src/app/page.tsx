"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    const res = await fetch('/api/list');
    const data = await res.json();
    setFiles(data.files);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      fetchFiles();
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Demo Firebase Storage</h1>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} disabled={loading || !file}>
        {loading ? 'Subiendo...' : 'Subir archivo'}
      </button>

      <h2>Archivos subidos</h2>
      <ul>
        {files.map((url, i) => (
          <li key={i}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url.split('/').pop()?.split('?')[0]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
