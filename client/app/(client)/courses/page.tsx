"use client";
import { Header } from "@/app/components";
import Footer from "@/app/components/Footer";
import Loader from "@/app/components/Loader/Loader";
import CourseCard from "@/app/components/courses/CourseCard";
import { styles } from "@/app/styles/style";
import Heading from "@/app/utils/Heading";
import { useGetAllCoursesForWebisteQuery } from "@/redux/features/courses/coursesApi";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutApi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const CoursesPage = (props: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter()
  const searchValue = searchParams?.get("title");

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState("All");

  const { data: categoriesData, isLoading } = useGetLayoutQuery("Categories");
  const { data: CoursesData, isLoading: isLoadingCourses } =
    useGetAllCoursesForWebisteQuery({});
  useEffect(() => {
    if (!searchValue && categories === "All") {
      setCourses(CoursesData?.courses);
      return
    }
    if (!(categories === "All")) {
      const FilteredCourses = CoursesData?.courses?.filter(
        (item: any) => item.categories === categories
      );
      setCourses(FilteredCourses);
      return
    }
    if (searchValue) {
      const SearchedCourses = CoursesData?.courses?.filter((item: any) =>
        item.name?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setCourses(SearchedCourses);
      return
    }
  }, [searchValue, categories, CoursesData]);


  const handleCategory = (category: string) => {
      const params:any = new URLSearchParams(searchParams?.toString());
    
      params?.delete("title")
      replace(`${pathname}`)
      setCategories(category)
  }


  return <>
    <Heading
      title={"Course" + " - Compile Academy"}
      description="Compile academy is a platform for students to learn and enhance skills."
      keywords={"Compile Academy"}
    />
    <Header
      open={open}
      setOpen={setOpen}
      activeItem={1}
      setRoute={setRoute}
      route={route}
    />
    {isLoading ? <Loader /> : <div className="min-h-[80vh] w-[95%] m-auto 800px:w-[85%]">

      <div className="w-full flex items-center flex-wrap">
        <div className={`h-[35px] ${categories === 'All' ? "bg-[--t-red]" : "bg-[--t-blue]"} m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer `}
          onClick={() => setCategories("All")}
        >
          All
        </div>
        {
          categoriesData && categoriesData?.layout?.categories?.map((category: any) => (
            <div key={category?._id}>
              <div className={`h-[35px] ${categories === category.title ? "bg-[--t-red]" : "bg-[--t-blue]"} m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer `}
                onClick={() => {
                  handleCategory(category.title)
                }}
              >
                {category.title}
              </div>
            </div>
          ))
        }
      </div>

      {
        courses && courses?.length === 0 && <p className={`${styles.label} text-[24px] justify-center flex items-center`}>
          {searchValue ? "No courses found!" : "No Courses found in this category"}
        </p>
      }
      <br />
      <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 1500px:grid-cols-4 1500px:gap-[30px] mt-10'>
        {
          courses?.map((course: any, index: number) => (
            <>
              <CourseCard item={course} key={course?._id} />
              {/* <CourseCard item={course} key={index} /> */}
            </>
          ))
        }
      </div>
    </div>}
    <Footer />
  </>;
};

export default CoursesPage;
