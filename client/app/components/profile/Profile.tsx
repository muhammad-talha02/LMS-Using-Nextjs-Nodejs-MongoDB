"use client";
import React, { FC, useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../courses/CourseCard";
import { useGetAllCoursesForWebisteQuery } from "@/redux/features/courses/coursesApi";
import { CourseData } from "../admin/course";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const router = useRouter();
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logout, setlogout] = useState(false);
  const [userCourses, setUserCourses] = useState([]);

  const enrolledCoursesByUser = user?.courses?.map(
    (course: any) => course?._id
  );
  const { data } = useSession();
  const { data: CoursesData, isLoading: isLoadingCourses } =
    useGetAllCoursesForWebisteQuery({});

  const {} = useLogoutQuery(undefined, {
    skip: !logout,
  });

  const logoutHandler = async () => {
    setlogout(true);
    if (data !== null) {
      await signOut();
    }
    router.push("/");
    // toast.success("Logout Sucessfully")
  };

  if (typeof window !== undefined) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  useEffect(() => {
    if (CoursesData?.courses && enrolledCoursesByUser) {
      const getUserCourses = CoursesData.courses?.filter((course: any) =>
        enrolledCoursesByUser.includes(course?._id)
      );
      setUserCourses(getUserCourses);
    }
  }, [CoursesData]);
  return (
    <div className="w-[85%] flex mx-auto min-h-screen">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        }`}
      >
        <SidebarProfile
          user={user}
          active={active}
          setActive={setActive}
          avatar={avatar}
          logoutHandler={logoutHandler}
        />
      </div>
      <div className="w-full my-[80px]">
        {active === 1 && <ProfileInfo user={user} avatar={avatar} />}
        {active === 2 && <ChangePassword />}
        {active === 3 && (
          <>
            <div className="mx-5 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 1500px:grid-cols-3 1500px:gap-[30px] mt-10">
              {userCourses && userCourses.length > 0 ? userCourses?.map((course: any, index: number) => (
                  <CourseCard item={course} key={course?._id} />
              )):  <p className="text-center my-5">You are not enrolled in any courses</p> }
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
