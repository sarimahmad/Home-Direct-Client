import client from "./client";

const register = (userInfo) => client.post("auth/Signup", userInfo);

export default { register };
