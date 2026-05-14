"use client";

import { useEffect, useState } from "react";
import { getRestaurants, addRestaurant, type Restaurant } from "./lib/api";
/* -------------------- MODEL -------------------- */

type FormState = {
  name: string;
  cuisine: string;
  rating: string;
  review: string;
};

/* -------------------- COMPONENT -------------------- */
export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [form, setForm] = useState<FormState>({
    name: "",
    cuisine: "",
    rating: "",
    review: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const data = await getRestaurants();
    setRestaurants(data.Items);

    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await addRestaurant(form);

    setForm({
      name: "",
      cuisine: "",
      rating: "",
      review: "",
    });

    loadData();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🍽️ Restaurant Reviews</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Cuisine"
          value={form.cuisine}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, cuisine: e.target.value })
          }
        />

        <input
          placeholder="Rating"
          value={form.rating}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, rating: e.target.value })
          }
        />

        <input
          placeholder="Review"
          value={form.review}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, review: e.target.value })
          }
        />

        <button type="submit">Submit</button>
      </form>

      {/* LIST */}
      <h2>All Restaurants</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        restaurants.map((r, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              margin: 10,
              padding: 10,
            }}
          >
            <h3>{r.name}</h3>
            <p>{r.cuisine}</p>
            <p>⭐ {r.rating}</p>
            <p>{r.review}</p>
          </div>
        ))
      )}
    </div>
  );
}
