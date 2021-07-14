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

  export const currentUser = async (authtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/current-user`,
      {},
      {
        headers: {
          authtoken,
        },
      }
    );
    console.log("sahil");
  };