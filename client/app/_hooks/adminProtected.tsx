"use client";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
type Props = {
  children: ReactNode;
};

const AdminProtected = ({ children }: Props) => {
  const { user } = useSelector((state: any) => state.auth);

  const isAdmin = user?.role === "admin";
  return isAdmin ? children : redirect("/dashboard");
};

export default AdminProtected;
