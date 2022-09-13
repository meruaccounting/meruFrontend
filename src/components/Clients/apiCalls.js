import { FormControlUnstyledContext } from '@mui/base';
import axios from 'axios';

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTZkZDcyZWIzYmQ5MzIyN2RhMGI5YiIsImlhdCI6MTY2MjY2NTY4OCwiZXhwIjoxNjY1MjU3Njg4fQ.V6Wg6QsqTEsZ1OQOOAIdiWLFkuDwS-qnopef1i9MiUI`,
  },
};

//  To Get all client from backend
export const getClientApi = async () => {
  try {
    const res = await axios.get('http://localhost:8000/client/', config);
    if (res.data && res.status === (200 || 201)) {
      return res.data.data;
    }
    // res.message 
    return 'Error Occured while fetching clients';
  } catch (error) {
    return 'Error Occured while fetching clients';
  }
};

// To get Info about client via his/her id
export const getClientByIdApi = async (clientId) => {
  try {
    const res = await axios.get(`http://localhost:8000/client/${clientId}`, config);
    if (res.data && res.status === (200 || 201)) {
      return res.data.data;
    }
    return 'Error Occured while fetching clients';
  } catch (error) {
    return 'Error Occured while fetching clients';
  }
};


// To Edit client Name

export const updateClientName = async (clientId, clientName) => {
    // what to send 
}
