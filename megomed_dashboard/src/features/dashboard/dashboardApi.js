import { baseApi } from "../../apiBaseQuery";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => "/payment/overview-all",
      providesTags: ["dashboard"],
    }),
    getTotalRevenueChartdata: builder.query({
      query: (year) => `/payment/all-earning-rasio?year=${year}`,
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetDashboardDataQuery, useGetTotalRevenueChartdataQuery } =
  dashboardApi;
