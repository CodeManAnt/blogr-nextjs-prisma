import React, { useEffect, useState } from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const [trackInfo, setTrackInfo] = useState<{ artist: string; album: string }>({
    artist: "",
    album: "",
  });

  useEffect(() => {
    const getNowPlaying = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization:
                "Bearer BQBdg_b_ZJ9mB6lnnZ7pvw8vaZpgScyEdGPZG7kBZDMul0XQHG4tTr5cboHO6RKBrt0soh5CxR9lo9fI-vhbt-sfiBXamzLJOF_rW56Q17anzih9raKREV-n6MCorV0jDRjonWXrjRCCZ9S1DHGfLYNaBfoHpz-S4DaYwytMqMjkXg6xpt2RgoO6gFs7H6Ya2wk6ofs",
              // Replace with your actual access token
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch current playing track");
        }

        const data = await response.json();
        const album = data.item.album.name;
        const artist = data.item.artists[0].name;
        setTrackInfo({ artist, album });
      } catch (error) {
        console.error("Failed to fetch current playing track:", error);
      }
    };

    getNowPlaying();
  }, []);

  const authorName = post.author ? post.author.name : "Unknown author";

  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <p>
        Currently Playing: {trackInfo.album} by {trackInfo.artist}
      </p>
      <ReactMarkdown children={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;