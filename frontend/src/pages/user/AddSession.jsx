import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const AddSession = () => {
  const { token } = useAppContext();
  const { id: sessionId } = useParams();
  const [typingTimer, setTypingTimer] = useState(null);
  const tagsRef = useRef("");


  const [session, setSession] = useState({
    _id: null,
    title: "",
    tags: "",
    json_file_url: "",
  });

  // Load existing session for edit
  useEffect(() => {
    if (!sessionId) return;
    axios
      .get(`/api/my-sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const sess = res.data?.session;
        if (sess) {
          setSession({
            _id: sess._id,
            title: sess.title,
            tags: sess.tags.join(", "),
            json_file_url: sess.json_file_url,
          });
        }
      })
      .catch(() => toast.error("Failed to load session"));
  }, [sessionId, token]);

  //  Handle Input Change + Auto-Save
  const handleChange = (e) => {
  const { name, value } = e.target;
  setSession((prev) => ({ ...prev, [name]: value }));

  if (name === "tags") {
    tagsRef.current = value;
  }

  if (typingTimer) clearTimeout(typingTimer);
  setTypingTimer(setTimeout(() => saveDraft(), 4000));
};


 const saveDraft = async () => {
  try {
    const payload = {
      ...session,
      tags: tagsRef.current.split(",").map((tag) => tag.trim()),
    };

    const res = await axios.post("/api/my-sessions/save-draft", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data.success && res.data.session) {
      setSession((prev) => ({
        ...prev,
        _id: res.data.session._id,
      }));
      toast.success("Auto-saved draft");
    } else {
      toast.error("Failed to save draft");
    }
  } catch (err) {
    console.error("Draft save error:", err);
    toast.error("Error saving draft, Need all the Field to be filled");
  }
};



  // Publish
  const handlePublish = async () => {
    if (!session.title.trim() || !session.tags.trim() || !session.json_file_url.trim()) {
    toast.error("Please fill in all the fields before publishing.");
    return;
  }
    try {
      const payload = {
        ...session,
        tags: session.tags.split(",").map((tag) => tag.trim()),
      };
      const res = await axios.post("/api/my-sessions/publish", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) toast.success("Session published!");
      else toast.error("Publish failed");
    } catch {
      toast.error("Error publishing session");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Add/Edit Session</h2>

      <label className="block font-medium mb-1">Title</label>
      <input
        type="text"
        name="title"
        value={session.title}
        onChange={handleChange}
        className="w-full mb-4 border px-3 py-2 rounded"
        placeholder="Session Title"
      />

      <label className="block font-medium mb-1">Tags (comma-separated)</label>
      <input
        type="text"
        name="tags"
        value={session.tags}
        onChange={handleChange}
        className="w-full mb-4 border px-3 py-2 rounded"
        placeholder="yoga, meditation"
      />

      <label className="block font-medium mb-1">JSON File URL</label>
      <input
        type="text"
        name="json_file_url"
        value={session.json_file_url}
        onChange={handleChange}
        className="w-full mb-6 border px-3 py-2 rounded"
        placeholder="https://example.com/session.json"
      />

      <div className="flex gap-4">
        <button
          onClick={saveDraft}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Save as Draft
        </button>
        <button
          onClick={handlePublish}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default AddSession;
