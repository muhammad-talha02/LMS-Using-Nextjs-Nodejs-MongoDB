"use client";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
type Props = {
  children: ReactNode;
};

const AdminProtected = ({ children }: Props) => {
  const { user, isLoading } = useSelector((state: any) => state.auth);
  if (isLoading) {
    return <Loader />;
  }
  const isAdmin = user?.role === "admin";
  return isAdmin ? children : notFound();
};

export default AdminProtected;
