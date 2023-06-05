// pages/create.tsx

import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import prisma from '../lib/prisma';
import { getToken } from 'next-auth/jwt';

const Draft: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      // Attach search results or selected song to the post body
      // For example, you can add a property like `song` to the body object
      // to store the selected song details.

      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  const searchSongs = async () => {
    try {
      // Call the Spotify API search endpoint with the search query
      const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`, {
        headers: {
          Authorization: `Bearer ${getToken}`, // Replace accessToken with the actual access token from Spotify
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSearchResults(data.tracks.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />

          {/* Add song search functionality */}
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a song"
            type="text"
            value={searchQuery}
          />
          <button onClick={searchSongs}>Search</button>
          <ul>
            {searchResults.map((song) => (
              <li key={song.id}>
                {song.name} - {song.artists[0].name}
                {/* Add a button or link to attach the selected song to the post */}
              </li>
            ))}
          </ul>

          <input disabled={!content || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
