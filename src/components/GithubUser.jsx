import { useState } from "react";

export default function GithubUser() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const findUser = async () => {
    if (!username.trim()) {
      alert("Please enter GitHub username");
      return;
    }

    try {
      setError("");
      const res = await fetch(`https://api.github.com/users/${username}`);
      
      if (!res.ok) {
        throw new Error("User not found");
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      setUser(null);
      setError("GitHub user not found");
    }
  };

  return (
    <div className="card">
      <h2>GitHub User Finder</h2>

      <input
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={findUser}>Find</button>

      {error && <p className="error">{error}</p>}

      {user && (
        <div className="profile">
          <img src={user.avatar_url} alt="profile" />
          <h3>{user.name || "No Name"}</h3>
          <p>@{user.login}</p>

          <a href={user.html_url} target="_blank" rel="noreferrer">
            Visit GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}
