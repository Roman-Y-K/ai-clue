'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

export const NavBar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(false);

  useEffect(() => {
    const runProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    runProviders();
  }, []);

  function toggleDropdown() {
    setActiveDropdown((prev) => !prev);
  }

  console.log(session, 'session');

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width="40"
          height="40"
          alt="Logo"
          className="object-contain"
        />
        <p className="logo_text text_gradient">AI Clue</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create_post" className="grey_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width="40"
                height="40"
                className="rounded-fill"
                alt="profile"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="grey_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <>
            <Image
              src={session?.user.image}
              width="40"
              height="40"
              className="rounded-fill"
              alt="profile"
              onClick={toggleDropdown}
            />
            {activeDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setActiveDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create_prompt"
                  className="dropdown_link"
                  onClick={() => setActiveDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full outline_btn"
                  onClick={signOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="grey_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
