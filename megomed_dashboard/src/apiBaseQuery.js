import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "./utils/storage";
import { baseURL } from "./utils/BaseURL";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}`,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "driverManagement",
    "category",
    "service",
    "user",
    "booking",
    "notification",
    "settings",
    "subscription",
    "earning",
    "profile",
    "settings",
    "project",
  ],
});
