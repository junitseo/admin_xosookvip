import { APIClient } from "../../helpers/api_helper";

import { api } from "../../config";

import axios from "axios";

const client = new APIClient();


const getAllUsers = async () => {
   try {
      const users = await client.get(`${api.API_URL}/api/v1/users`, );
      console.log('users: ', users);
      return users
    } catch (error) {
      throw new Error(error)
    }
}

const authenticate = async (username, password) => {
    try {
        const user = await axios.post(`${api.API_URL}/api/v1/users/authenticate`, {username, password})
        console.log(user)
    } catch (error) {
        console.log(error)
    }
}

export default {getAllUsers}