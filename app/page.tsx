"use client";

import { useEffect, useState, useRef } from "react";
import { getRestaurants, addRestaurant, type Restaurant } from "./lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// 1. helpers
const convertToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};

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
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    cuisine: "",
    rating: "",
    review: "",
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const data = await getRestaurants();
        setRestaurants(data.Items);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitting(true);

    try {
      let imageBase64  = "";

      if (file) {
      imageBase64  = await convertToBase64(file);
      }

      await addRestaurant({
        ...form,
        image: imageBase64,
      });

      setForm({
        name: "",
        cuisine: "",
        rating: "",
        review: "",
      });

      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      const data = await getRestaurants();
      setRestaurants(data.Items);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen text-gray-900 p-6 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-rose-100">
      {/* decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-40 -right-20 w-72 h-72 bg-yellow-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-40 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-20"></div>
      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto mt-8">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight">
            🍽️ FoodieFeed
          </h1>
          <p className="text-gray-600 mt-2">
            Discover and share your favorite places to eat
          </p>
        </div>

        {/* FORM */}
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl rounded-2xl p-6 mb-10">
          <form onSubmit={handleSubmit} className="grid gap-3">
            <input
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Restaurant Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Cuisine (e.g. Italian, Sri Lankan)"
              value={form.cuisine}
              onChange={(e) => setForm({ ...form, cuisine: e.target.value })}
            />

            <input
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Rating (1 - 5)"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
            />

            <input
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Your Review"
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
  if (e.target.files?.[0]) {
    setFile(e.target.files[0]);
  }
}}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <button
              disabled={submitting}
              className={`mt-2 w-full font-semibold p-3 rounded-xl shadow transition ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-900 hover:scale-[1.02]"
              } text-white`}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Latest Restaurants</h2>

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {restaurants.map((r, i) => (
                <div
                  key={i}
                  className="group bg-white/80 backdrop-blur border border-white/40 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold group-hover:text-blue-600 transition">
                      {r.name}
                    </h3>

                    <span className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                      ⭐ {r.rating}/5
                    </span>
                  </div>

                  {r.imageUrl && (
                    <img
                      src={r.imageUrl}
                      alt={r.name}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                  )}

                  <p className="text-sm text-gray-500 mt-1">{r.cuisine}</p>

                  <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                    {r.review}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
