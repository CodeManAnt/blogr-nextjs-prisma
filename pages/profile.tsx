// pages/profile.tsx

import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '@components/Layout';
import prisma from '@lib/prisma';
import Profile, { ProfileProps } from '@components/Profile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: {} };
  }

  if (!session.user || !session.user.email) {
    return { props: {} };
  }

  const profilePage = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!profilePage) {
    return { props: {} };
  }

  return {
    props: {
      profilePage: {
        ...profilePage,
        createdAt: profilePage.createdAt.toISOString(),
        updatedAt: profilePage.updatedAt.toISOString(), // Add this line
      },
    },
  };
};

type Props = {
  profilePage: ProfileProps | null;
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
          <div className="profile">
            <Profile profile={props.profilePage} />
          </div>
      </main>
      </div>
      <style jsx>{`
        .profile {
          transition: box-shadow 0.1s ease-in;
        }
      `}</style>
    </Layout>
  );
};

export default ProfilePage;