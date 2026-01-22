type Post = {
  id: number;
  title: string;
  content?: string | null;
  createdAt: string;
};

export default async function Home() {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return (
      <main style={{ padding: 20 }}>
        <h1>Posty</h1>
        <p style={{ color: "red" }}>
          Brakuje zmiennej środowiskowej <b>API_URL</b> w pliku{" "}
          <code>.env.local</code>
        </p>
        <p>Dodaj w: <code>frontend/bobrek-app/.env.local</code></p>
        <pre>API_URL=http://localhost:3001</pre>
      </main>
    );
  }

  const res = await fetch(`${apiUrl}/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main style={{ padding: 20 }}>
        <h1>Posty</h1>
        <p style={{ color: "red" }}>
          Błąd pobierania danych z API: <b>{res.status}</b>
        </p>
      </main>
    );
  }

  const posts: Post[] = await res.json();

  return (
    <main style={{ padding: 20 }}>
      <h1>Posty</h1>

      {posts.length === 0 ? (
        <p>Brak postów</p>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {posts.map((p) => (
            <li key={p.id} style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 700 }}>{p.title}</div>

              {p.content ? (
                <div style={{ marginTop: 4 }}>{p.content}</div>
              ) : null}

              <div style={{ marginTop: 4, fontSize: 12, opacity: 0.7 }}>
                {new Date(p.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
