// pages/profile.tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import prisma from '../lib/prisma';
import Profile, { ProfileProps } from '../components/Profile';


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });
    if (!session) {
      res.statusCode = 403;
      return { props: { profile: [] } };
    }
  
    const profilePage = await prisma.user.findUnique({
        where: {
          email: session.user.email
      },
        // Add other profile properties as needed
      });
      return {
        props: { profilePage },
      };
    };

type Props = {
    profilePage: ProfileProps[];
};

const ProfilePage: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Profile</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  if (!props.profilePage) {
    return (
      <Layout>
        <h1>My Profile</h1>
        <div>No profile found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
      <main>
          {props.profilePage.map((profile) => (
            <div key={profile.id} className="profile">
              <Profile profile={profile} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .profile {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );

};

export default ProfilePage;
