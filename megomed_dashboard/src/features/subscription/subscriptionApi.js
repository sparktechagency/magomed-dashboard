import { baseApi } from "../../apiBaseQuery";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscription: builder.mutation({
      query: (data) => ({
        url: `/package/packages`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subscription"],
    }),

    updateSubscription: builder.mutation({
      query: ({ id, data }) => ({
        url: `/package/packages/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["subscription"],
    }),

    getSubscription: builder.query({
      query: () => ({
        url: `/package/packages`,
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),

    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/package/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useGetSubscriptionQuery,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
