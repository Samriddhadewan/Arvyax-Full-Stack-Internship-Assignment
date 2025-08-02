import React from "react";

const SessionCard = ({ session }) => {
  const {
    title,
    created_at,
    updated_at,
    json_file_url,
    tags,
    status,
    _id,
    user_id,   // populated user object
  } = session;

  const formatDate = (isoDate) => new Date(isoDate).toLocaleString();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-md w-full hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">{title}</h2>

      {/* Author name */}
      <p className="text-sm text-gray-600 mb-3">
        <span className="font-medium text-gray-600">Added By:</span>{" "}
        {user_id?.name || "Unknown"}
      </p>

      <p className="text-sm text-gray-500 mb-1">
        <span className="font-medium">Status:</span>{" "}
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-white text-xs ${
            status === "published" ? "bg-green-500" : "bg-yellow-500"
          }`}
        >
          {status}
        </span>
      </p>

      <p className="text-sm text-gray-600 mb-2">
        <span className="font-medium">Created:</span> {formatDate(created_at)}
      </p>

      <p className="text-sm text-gray-600 mb-4">
        <span className="font-medium">Updated:</span> {formatDate(updated_at)}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      <a
        href={json_file_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-indigo-600 hover:underline"
      >
        View JSON
      </a>
    </div>
  );
};

export default SessionCard;
