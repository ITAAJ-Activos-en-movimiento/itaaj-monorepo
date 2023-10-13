import axios from "axios";

export const getLeads = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/v1/leads`);
    return data;
  };
  