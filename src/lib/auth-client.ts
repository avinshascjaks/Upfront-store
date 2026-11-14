import { createAuthClient } from "better-auth/react";

// Same-origin by default; set baseURL if the auth server runs elsewhere.
export const authClient = createAuthClient();
