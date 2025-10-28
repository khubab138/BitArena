"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useSetUserMutation, useGetUsersQuery } from "@/Store/firestoreAPI";
import { setUsers } from "@/Store/userSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, isLoaded, user } = useUser();
  const dispatch = useDispatch();

  const [setUser, { isSuccess: setSuccess, isLoading: setLoading }] =
    useSetUserMutation();

  const { data, isLoading: getLoading } = useGetUsersQuery(user?.id ?? "", {
    skip: !user?.id,
  });

  useEffect(() => {
    if (!getLoading && !data && !setLoading && isSignedIn && isLoaded && user) {
      setUser({
        id: user.id,
        data: {
          name: user.fullName ?? "",
          email: user.emailAddresses?.[0]?.emailAddress ?? "",
        },
      });
    }
  }, [data, getLoading, setLoading, isSignedIn, isLoaded, user, setUser]);

  useEffect(() => {
    if (data && isSignedIn && !getLoading) {
      dispatch(
        setUsers({
          Id: data.id,
          name: data.name,
          email: data.email,
          level: data.level,
          xp: data.xp,
          coin: data.coin,
          xpToNext: data.xpToNext,
        })
      );
    }
  }, [data, isSignedIn, getLoading, dispatch]);

  return <>{children}</>;
}
