import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const MySessions = () => {
  const { token } = useAppContext();
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await axios.get("/api/my-sessions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          const filtered = res.data.sessions.filter(
            (session) => session.status === "draft"
          );
          setDrafts(filtered);
        } else {
          console.error("Failed to load sessions");
        }
      } catch (error) {
        console.error("Error fetching drafts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, [token]);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">📝 My Draft Sessions</h2>

      {loading ? (
        <p>Loading drafts...</p>
      ) : drafts.length === 0 ? (
        <p>No drafts found.</p>
      ) : (
        <ul className="space-y-4">
          {drafts.map((draft) => (
            <li
              key={draft._id}
              className="border p-4 rounded-lg bg-white shadow"
            >
              <h3 className="text-lg font-bold text-gray-800">{draft.title}</h3>
              <p className="text-sm text-gray-600">
                Tags: {draft.tags.join(", ")}
              </p>
              <p className="text-sm text-gray-400">
                Last updated: {new Date(draft.updated_at).toLocaleString()}
              </p>
              <Link
                to={`/user/edit-session/${draft._id}`}
                className="inline-block mt-2 text-blue-600 hover:underline"
              >
                ✏️ Edit Draft
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MySessions;
