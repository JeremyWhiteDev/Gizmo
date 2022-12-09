import { googleAuth } from "./googleAuth";
import { emailAuth } from "./emailAuth";

// Checks for which log out we should do... maybe don't need this.
// other methods may work for both.

export const logout = {
  logout: async function (navigate, queryClient) {
    const userRecord = JSON.parse(localStorage.getItem("capstone_user"));
    if (userRecord.type === "google") {
      return googleAuth.signOut(navigate, queryClient);
    } else if (userRecord.type === "email") {
      return await emailAuth.signOut(navigate, queryClient);
    }
  },
};
