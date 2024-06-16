"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import Protected from "../../_hooks/useProtected";
import { Header } from "../../components";
import Profile from "../../components/profile/Profile";
import Heading from "../../utils/Heading";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  const { user } = useSelector((state: any) => state.auth);
  return (
    <>
      <Protected>
        <Heading
          title={`${user?.name} Profile`}
          description="Compile academy is a platform for students to learn and enhance skills."
          keywords="Programming,MERN,Machine Learning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={6}
          setRoute={setRoute}
          route={route}
        />

        <Profile user={user} />
      </Protected>
    </>
  );
};

export default Page;
