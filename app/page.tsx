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
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-6">
        🍽️ Restaurant Reviews
      </h1>

      {/* FORM CARD */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mb-8">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-2 border rounded"
            placeholder="Restaurant Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Cuisine"
            value={form.cuisine}
            onChange={(e) => setForm({ ...form, cuisine: e.target.value })}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Rating (1-5)"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Review"
            value={form.review}
            onChange={(e) => setForm({ ...form, review: e.target.value })}
          />

          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Submit Review
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">All Restaurants</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {restaurants.map((r, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold">{r.name}</h3>
                <p className="text-gray-600">{r.cuisine}</p>
                <p className="mt-1">⭐ {r.rating}/5</p>
                <p className="text-sm mt-2 text-gray-700">{r.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
