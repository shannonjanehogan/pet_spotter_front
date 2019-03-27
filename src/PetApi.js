const axios = require('axios');
const ROOT_URL = "http://localhost:8080";

class PetsApi {

  static async getPetsByShelter(shelter_id) {
    try {
      const response = await axios.get(`${ROOT_URL}/shelters/${shelter_id}/animals`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllPets() {
    try {
      const response = await axios.get(`${ROOT_URL}/animals`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async createDonation(data) {
    try {
      const response = await axios.post(`${ROOT_URL}/donations`, {
        data
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteDonation(donation_id) {
    try {
      const response = await axios.delete(`${ROOT_URL}/donations/${donation_id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async updateClient(clientId, data) {
    try {
      const response = await axios.put(`${ROOT_URL}/client/${clientId}`, {
        data
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async getAnimalPickups() {
    try {
      const response = await axios.get(`${ROOT_URL}/animalpickups`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async getTaxReceipt(donor_id) {
    try {
      const response = await axios.get(`${ROOT_URL}/donors/${donor_id}/taxreceipt`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async getDonations() {
    try {
      const response = await axios.get(`${ROOT_URL}/donations`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async getDonors() {
    try {
      const response = await axios.get(`${ROOT_URL}/donors`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default PetsApi;
