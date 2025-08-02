import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import axios from 'axios';

const Dashboard = () => {
  const {token} = useAppContext();
  const [publishedSessions, setPublishedSessions] = useState([])
  const [stats, setStats] = useState({total: 0, draft:0, published:0})

  useEffect(()=>{
    const fetchStats = async()=>{
      try {
        const res = await axios.get("/api/sessions/stats",{
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        if(res.data.success){
          setStats(res.data.stats)
        }
      } catch (error) {
        console.error('error fetching session stats:', error.message)
      }
    };
    fetchStats()
  },[token])

  useEffect(()=>{
    const fetchPublishedSessions = async()=>{
      try {
        const res = await axios.get("/api/sessions/published", {
          headers : {
            Authorization: `Bearer ${token}`
          }
        });
        if(res.data.success){
          setPublishedSessions(res.data.sessions)
        }
      } catch (error) {
        console.error('error fetching sessions', error.message)
      }
    }
    fetchPublishedSessions()
  },[token])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <div>
            <p className="font-semibold text-xl text-gray-600">{stats.total}</p>
            <p className="text-gray-400 font-light">Total Sessions</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <div>
            <p className="font-semibold text-xl text-gray-600">{stats.published}</p>
            <p className="text-gray-400 font-light">Posted Sessions</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <div>
            <p className="font-semibold text-xl text-gray-600">{stats.draft}</p>
            <p className="text-gray-400 font-light">Drafts Sessions</p>
          </div>
        </div>
      </div>

      {/* List of Published Sessions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Published Sessions</h2>
        {publishedSessions.length === 0 ? (
          <p className="text-gray-500">No published sessions found.</p>
        ) : (
          <ul className="space-y-4">
            {publishedSessions.map(session => (
              <li key={session._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800">{session.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Created: {new Date(session.created_at).toLocaleString()}
                </p>
                <p className="mb-2">
                  <strong>Tags: </strong>
                  {session.tags && session.tags.length > 0 ? (
                    session.tags.join(', ')
                  ) : (
                    'No tags'
                  )}
                </p>
                <a
                  href={session.json_file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View JSON File
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard
