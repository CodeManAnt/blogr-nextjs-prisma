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
                "Bearer BQBEcmwId0lKyWQqky9s6NCnUOFvs7NUKQkxROsSS2LzkQ_1sA3i_6SGdJjx8IQajI_pyL5bYfeAfPX_f9dK0opiLOjH5FUaEntZ6_w2TI8g_3rJyYTdN7sXquvieYRLUJnp4eeDXHGKo7Xv3rM5FltFKhmZ7amjzwc30aysVUvhBSo6uyEHR85FnspkEBaFqZGk87A",
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
          color: #fff; /* Text color */
          padding: 2rem;
          background: #343a40; /* Dark background color */
          border-radius: 0.5rem;
          cursor: pointer;
        }

        h2 {
          color: #fff; /* Heading text color */
        }

        small {
          color: rgba(255, 255, 255, 0.8); /* Subtext color */
        }

        p {
          color: #fff; /* Paragraph text color */
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default Post;
