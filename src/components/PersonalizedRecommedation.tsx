"use client"; 

import React, { useState } from "react";
import axios from "axios";

const PersonlizedRecommendations = () => {
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "/api/get-personalized-recommendation/67cab7250b3cc6436cebd7a7"
      );
      setRecommendations(response.data.recommendations);
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to parse and format the recommendations
  const formatRecommendations = (text:any) => {
    return text
      .split("\n") // Split by new lines
      .map((line:any, index:any) => {
        // Format headings (e.g., **Heading**)
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <h2 key={index} className="text-xl font-bold text-gray-800 mt-6 mb-2">
              {line.replace(/\*\*/g, "")}
            </h2>
          );
        }
        // Format bullet points (e.g., * List item)
        if (line.startsWith("*")) {
          return (
            <li key={index} className="text-gray-600 text-sm mb-2">
              {line.replace(/^\*\s*/, "")}
            </li>
          );
        }
        // Format regular paragraphs
        return (
          <p key={index} className="text-gray-600 text-sm mb-4">
            {line}
          </p>
        );
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Personalized Health Recommendations
      </h1>

      <button
        onClick={fetchRecommendations}
        disabled={loading}
        className="block mx-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : "Get Personalized AI Recommendations"}
      </button>

      {error && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}

      {recommendations && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Your Recommendations:
          </h2>
          <div className="space-y-4">
            {formatRecommendations(recommendations)}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonlizedRecommendations;