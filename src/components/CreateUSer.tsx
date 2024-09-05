import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function CreateUSer() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        name,
        email,
        phone,
      })
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch(() => {
        setError("failed to create user");
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Create User</h1>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit">Create</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
}
