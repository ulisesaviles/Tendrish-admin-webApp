import axios from "axios";

export const query = async (method, body) => {
  return await axios.post(
    "https://us-central1-tendrishh.cloudfunctions.net/server",
    { method, ...body }
  );
};
