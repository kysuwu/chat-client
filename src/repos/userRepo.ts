import { User } from "../entites/user.js";
import axios from "axios";

export class UserRepo {
  constructor(private options: { baseUrl: string }) {}
  async getCurrentUser(cookie: string | null): Promise<User> {
    const baseURL = this.options.baseUrl;
    const response = await axios.get("/api/me", {
      baseURL,
      params: {
        cookie,
      },
    });
    return response.data;
  }
}

// const userRepo = new UserRepo({
//     baseUrl: process.env.BASE_URL,
// });

//do i even need it?? maybe i would need to implement this later
