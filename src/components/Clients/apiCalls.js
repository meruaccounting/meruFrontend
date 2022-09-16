//  global ui
import axios from 'axios';


//  To Get all client from backend
export const getClientApi = async () => {
  try {
    const res = await axios.get('/client');
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
    const res = await axios.get(`/client/${clientId}`);
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
    const res = await axios.patch(`/client/${clientId}`, { name: clientName });
    if (res.data && res.status === (200 || 201)) return res.data.data;
    return res.data;
  } catch (error) {
    return 'Error Occured while updating clients';
  }
};

//  To delete client

export const deleteClient = async (clientId) => {
  try {
    const res = await axios.delete(`/client/${clientId}`);
    if(res.data && res.status === (200 || 202)){
      return res.data.data
    }
    return res.data;
  } catch (error) {
    return 'Error Occured while deleting clients';
  }
};


export const addNewClient = async(name) => {
  try {
    const res = await axios.post('/client', {name});
    if(res.data && res.status === (200 || 201)){
      return res.data.data
      }
      return res.data;
  } catch (error) {
    return 'Error Occured while creating clients';
  }
}