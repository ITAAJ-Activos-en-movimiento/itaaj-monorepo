import axios from "axios";

export const getLeads = async () => {
    const { data } = await axios.get(`https://itaajrealty.com/api/api/v1/leads`);
    return data;
  };
  