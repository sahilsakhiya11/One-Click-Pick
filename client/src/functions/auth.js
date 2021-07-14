import axios from "axios";


export const createOrUpdateUser = async (authtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/createOrUpdateUser`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    );
    console.log("sahil");
  };