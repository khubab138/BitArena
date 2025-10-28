"use client";

import { setUsers } from "@/Store/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface Props {
  firstName: string;
}

const ClientDispatcher = ({ firstName }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstName) {
      // dispatch(setUsers(firstName));
    }
  }, [firstName, dispatch]);

  return <div>Welcome, {firstName}</div>;
};

export default ClientDispatcher;
