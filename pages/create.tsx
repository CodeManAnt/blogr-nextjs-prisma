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

          <input
            disabled={!content || !title}
            type="submit"
            value="Create"
            className="submit-btn"
          />
          <button className="submit-btn cancel-btn">
            <a className="back" href="#" onClick={() => Router.push('/')}>
              Cancel
            </a>
          </button>
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

        input[type='submit'],
        button.submit-btn {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .submit-btn {
          background-color: #343a40; /* Dark background color */
          color: #000; /* Text color */
          border-radius: 0.5rem; /* Rounded corners */
          transition: background-color 0.2s ease-in-out;
          margin-right: 5em; /* 5em margin separating it from the Create button */
        }

        .cancel-btn a {
          text-decoration: none;
          height: 52px;
          width: 114px;
          align-text: center;
        }

        .submit-btn:hover {
          background-color: #555; /* Darker background color on hover */
          color: #fff; /* Text color */
        }

        .submit-btn:active {
          background-color: yellow; /* Yellow background color when clicked */
          color: #000; /* Text color when clicked */
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>

  );
};

export default Draft;
