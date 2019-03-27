const axios = require('axios');

class PetsApi {

  async getPetsByShelter(shelter_id) {
    try {
      const response = await axios.get(`http://127.0.0.1:8080/shelters/?id=${shelter_id}/animals`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllPets() {
    try {
      const response = await axios.get('http://127.0.0.1:8080/animals');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async createDonation(data) {
    try {
      const response = await axios.post('http://127.0.0.1:8080/donations', {
        data
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteDonation(donation_id) {
    try {
      const response = await axios.delete(`http://127.0.0.1:8080/donations/?id=${donation_id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async updateClient(data) {
    try {
      const response = await axios.put(`http://127.0.0.1:8080/client/?id=${data.id}`, {
        data
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getAnimalPickups() {
    try {
      const response = await axios.get('http://127.0.0.1:8080/animalpickups');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getTaxReceipt(donor_id) {
    try {
      const response = await axios.get(`http://127.0.0.1:8080/donors/?id=${donor_id}/taxreceipt`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getDonations() {
    try {
      const response = await axios.get('http://127.0.0.1:8080/donations');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getDonors() {
    try {
      const response = await axios.get('http://127.0.0.1:8080/donors');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default PetsApi;
