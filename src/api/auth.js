import client from "./client";

const login = (email, password) => client.post("auth/Login", { email, password });

export default {
  login,
};
