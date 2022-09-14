//  global ui
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
    return res.data;
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
    return res.data;
  } catch (error) {
    return 'Error Occured while fetching client information';
  }
};

// To Edit client Name

export const updateClientName = async (clientId, clientName) => {
  try {
    const res = await axios.patch(`http://localhost:8000/client/${clientId}`, { name: clientName }, config);
    if (res.data && res.status === (200 || 201)) return res.data.data;
    return res.data;
  } catch (error) {
    return 'Error Occured while updating clients';
  }
};

//  To delete client

export const deleteClient = async (clientId) => {
  try {
    const res = await axios.delete(`http://localhost:8000/client/${clientId}`, config);
    if(res.data && res.status === (200 || 202)){
      return res.data.data
    }
    return res.data;
  } catch (error) {
    return 'Error Occured while deleting clients';
  }
};
