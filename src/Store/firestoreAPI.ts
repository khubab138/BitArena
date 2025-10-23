import db from "@/fireStore/firestoreConfig";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const firestoreapi = createApi({
  reducerPath: "firestoreapi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["USERS"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      async queryFn(id) {
        try {
          const ref = doc(db, "users", id);
          const userSnap = await getDoc(ref);

          if (!userSnap?.exists()) {
            return { error: { message: "User not found" } };
          }

          const data = userSnap.data();

          // Safely handle timestamps
          const createdAt = data.createdAt?.toDate?.().toISOString?.() ?? null;

          return {
            data: {
              id: userSnap.id,
              ...data,
              createdAt, // Overwrite to make serializable
            },
          };
        } catch (error) {
          return { error: { message: (error as Error)?.message } };
        }
      },

      // ✅ This avoids indexOf crash
      providesTags: (result, error, id) =>
        result ? [{ type: "USERS", id }] : [],
    }),

    setUser: builder.mutation({
      async queryFn({ data, id }) {
        try {
          const ref = doc(db, "users", id);
          await setDoc(ref, data);
          return { data: "success" };
        } catch (error) {
          return {
            error: {
              message: (error as Error).message || "Failed to add document",
            },
          };
        }
      },
      invalidatesTags: ["USERS"],
    }),
    deleteUsers: builder.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "users", id));
          return { data: "success" };
        } catch (error) {
          return {
            error: {
              message: (error as Error).message || "Failed to add document",
            },
          };
        }
      },
      invalidatesTags: ["USERS"],
    }),
    updateUsers: builder.mutation({
      async queryFn({ id, data }) {
        try {
          await updateDoc(doc(db, "users", id), data);
          return { data: "success" };
        } catch (error) {
          return {
            error: {
              message: (error as Error).message || "Failed to add document",
            },
          };
        }
      },
      invalidatesTags: ["USERS"],
    }),
  }),
});
export const {
  useGetUsersQuery,
  useSetUserMutation,
  useDeleteUsersMutation,
  useUpdateUsersMutation,
} = firestoreapi;
