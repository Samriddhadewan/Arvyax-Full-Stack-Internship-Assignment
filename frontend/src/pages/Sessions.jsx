import React from 'react'
import { useAppContext } from '../context/AppContext';
import SessionCard from '../components/SessionCard';

const Sessions = () => {
  const { sessions } = useAppContext();
  console.log(sessions);

  return (
    <div className="p-6 max-w-[1440px] mx-auto" >
      <h1 className="text-center text-4xl font-semibold text-gray-600 mb-8">All Sessions</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sessions.map((session) => (
          <SessionCard key={session._id} session={session} />
        ))}
      </div>
    </div>
  );
};

export default Sessions;
