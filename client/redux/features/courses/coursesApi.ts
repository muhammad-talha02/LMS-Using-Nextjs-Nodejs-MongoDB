import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getAllCourses: builder.query({
      query: () => ({
        url: "get-all-courses",
        method: "GET",
        // body: data,
        credentials: "include" as const,
      }),
      providesTags: ["GetAllCourses"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        // body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["GetAllCourses"],
    }),

    getSingleCourseAdmin: builder.query({
      query: (id) => ({
        url: `get-single-course/${id}`,
        method: "GET",
        // body: data,
        credentials: "include" as const,
      }),
    }),

    updateCourse: builder.mutation({
      query: ({ data, id }) => ({
        url: `update-course/${id}`,
        method: "PUT",
        body: data,
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
  useUpdateCourseMutation
} = coursesApi;
