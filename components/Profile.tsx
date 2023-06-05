import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type ProfileProps = {
  id: string;
  name: string;
  email: string;
  bio: string;
};

const Profile: React.FC<{ profile: ProfileProps }> = ({ profile }) => {
  const name = profile.name; 
  const email = profile.email;
  const bio = profile.bio;
  return (
    <div>
      <h2>{name}</h2>
      <ReactMarkdown children={email} />
      <ReactMarkdown children={bio} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Profile;
