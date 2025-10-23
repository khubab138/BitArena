"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getName } from "@/Store/userSlice";

interface Props {
  firstName: string;
}

const ClientDispatcher = ({ firstName }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstName) {
      dispatch(getName(firstName));
    }
  }, [firstName, dispatch]);

  return <div>Welcome, {firstName}</div>;
};

export default ClientDispatcher;
