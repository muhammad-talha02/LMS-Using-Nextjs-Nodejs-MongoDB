import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //? Create Course By Admin
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    //? Get All Courses By Admin
    getAllCourses: builder.query({
      query: () => ({
        url: "get-all-courses",
        method: "GET",
        // body: data,
        credentials: "include" as const,
      }),
      providesTags: ["GetAllCourses"],
    }),

    //? Delete Course By Admin
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        // body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["GetAllCourses"],
    }),

    //? Get Single Course By Admin
    getSingleCourseAdmin: builder.query({
      query: (id) => ({
        url: `get-single-course/${id}`,
        method: "GET",
        // body: data,
        credentials: "include" as const,
      }),
    }),

    //? Update Course By Admin
    updateCourse: builder.mutation({
      query: ({ data, id }) => ({
        url: `update-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["GetAllCourses"],
    }),

    //? Get All Courses For Non-Register Users
    getAllCoursesForWebiste: builder.query({
      query: () => ({
        url: `get-courses`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    //? Get Course Details
    getCourseDetail: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    //? Get Course Content
    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useGetSingleCourseAdminQuery,
  useUpdateCourseMutation,
  useGetAllCoursesForWebisteQuery,
  useGetCourseDetailQuery,
  useGetCourseContentQuery
} = coursesApi;
