import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000/api/user/" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "register",
          method: "POST",
          body: user,
          headers: { "Content-type": "application/json" },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: "login",
          method: "POST",
          body: user,
          headers: { "Content-type": "application/json" },
        };
      },
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: "send-password-reset-email",
          method: "POST",
          body: user,
          headers: { "Content-type": "application/json" },
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (actualData, id, token) => {
        // console.log("cfgvbnhjm,", actualData, id, token);
        return {
          url: `reset-password/${actualData.id}/${actualData.token}`,
          method: "POST",
          body: actualData,
          headers: { "Content-type": "application/json" },
        };
      },
    }),
    getLoggedUser: builder.query({
      query: (token) => {
        // console.log("api:", token);
        return {
          url: `loggedUserDetails`,
          method: "GET",

          headers: { authorization: `Bearer ${token}` },
        };
      },
    }),
    changeUserPassword: builder.mutation({
      query: ({ actualData, token }) => {
        console.log("api:", { token, actualData });
        return {
          url: `changePassword`,
          method: "POST",
          body: actualData,
          headers: { authorization: `Bearer ${token}` },
        };
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useSendPasswordResetEmailMutation,
  useResetPasswordMutation,
  useGetLoggedUserQuery,
  useChangeUserPasswordMutation,
} = authApi;
