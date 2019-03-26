class PetsApi {
  static fetchAnimalsByShelter(shelter_id) {
    let url = new URL(`http://127.0.0.1:8080/shelters/${shelter_id}/animals`)
    return fetch(url, {
      method: 'GET',
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    })
  }

  static fetchAnimals() {
    let url = new URL('http://127.0.0.1:8080/animals')
    return fetch(url, {
      method: 'GET',
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    })
  }

  static postDonation(data) {
    let url = new URL('http://127.0.0.1:8080/donations')
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
      //  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
       'Content-Type': 'application/json'
      }
    })
  }

}

export default PetsApi;
