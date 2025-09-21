import { baseApi } from "../../apiBaseQuery";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserManagement: builder.query({
      query: ({ page = 1, searchValue = "" }) => ({
        url: `/users/all-users`,
        params: {
          page,
          searchTerm: searchValue,
        },
      }),
      providesTags: ["user"],
    }),
    updateUserStatus: builder.mutation({
      query: (data) => ({
        url: `/user/all-users/${data.id}`, // Updated endpoint
        method: "PATCH",
        body: data /* {
    "status": "active"
} */,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUserManagementQuery, useUpdateUserStatusMutation } =
  userApi;
