/**
 *  This is a mock class designed to mimic responses
 *  from the back-end with built-in delay.  It's assumed that
 *  the back-end will return responses in the form of JSON objects/arrays.
 */

export default class Mock {
  static getEmptyResponse(request) {
    setTimeout(function(){
      return {};
    }, 500);
  }

  /**
   * After 1 second, resolves a promise with a JSON object representing info needed
   * to get a tax receipt.  Object contains:
   * - cName: string
   * - total: float
   * @param request
   * @returns {Promise<any>}
   */
  static getTaxReceipt(request) {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve({
          code: 200,
          body: {
            cName: "Hazra Imran",
            total: 450.66
          }
        });
      }, 1000);
    });
  }

  /**
   * After 1 second, resolves a promise with a JSON array representing pets at all shelters.
   * Array is made of of object containing:
   * - sName: string
   * - aName: string
   * - age: int
   * - weight: float
   * - gender: string (one of "M" or "F")
   * - species: string
   * - breed: string
   * - goodWithKids: bool
   * - goodWithCats: bool
   * - goodWithDogs: bool
   * @returns {Promise<any>}
   */
  static getAllPets() {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve({
            code: 200,
            body:
            [
          {
            sName: "Broadway West",
            aName: "Toby",
            age: 3,
            weight: 20.6,
            gender: "M",
            species: "Dog",
            breed: "Cocker Spaniel",
            goodWithKids: true,
            goodWithCats: false,
            goodWithDogs: true
          },
          {
            sName: "Broadway West",
            aName: "Duke",
            age: 8,
            weight: 40.7,
            gender: "M",
            species: "Dog",
            breed: "Golden Retriever",
            goodWithKids: true,
            goodWithCats: true,
            goodWithDogs: true
          },
          {
            sName: "Delta",
            aName: "Fluffy",
            age: 6,
            weight: 20.7,
            gender: "F",
            species: "Cat",
            breed: "American Shorthair",
            goodWithKids: true,
            goodWithCats: true,
            goodWithDogs: false
          },
        ]});
      }, 1000);
    });
  }

  /**
   * After 1 second, resolves a promise with a JSON array representing pets at one shelter.
   * Array is made of of object containing:
   * - aName: string
   * - age: int
   * - weight: float
   * - gender: string (one of "M" or "F")
   * - species: string
   * - breed: string
   * - goodWithKids: bool
   * - goodWithCats: bool
   * - goodWithDogs: bool
   * @returns {Promise<any>}
   */
  static getPetsByShelter(request) {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve(
            { code: 200,
              body: [
          {
            aName: "Toby",
            age: 3,
            weight: 20.6,
            gender: "M",
            species: "Dog",
            breed: "Cocker Spaniel",
            goodWithKids: true,
            goodWithCats: false,
            goodWithDogs: true
          },
          {
            aName: "Duke",
            age: 8,
            weight: 40.7,
            gender: "M",
            species: "Dog",
            breed: "Golden Retriever",
            goodWithKids: true,
            goodWithCats: true,
            goodWithDogs: true
          },
        ]});
      }, 1000);
    });
  }

  /**
   * After 1 second, resolves a promise with a JSON array representing total donations for each shelter.
   * Array is made of objects containing:
   * - sName: string
   * - totalAmount: float
   * @returns {Promise<any>}
   */
  static getDonationsByShelter() {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve({code: 200, body: [
          {
            sName: "Broadway West",
            totalAmount: 1000.66,
          },
          {
            sName: "Richmond South",
            totalAmount: 200.00,
          },
          {
            sName: "Burnaby",
            totalAmount: 500.00,
          },
          {
            sName: "Delta",
            totalAmount: 768.77,
          },
          {
            sName: "Surrey South",
            totalAmount: 367.82,
          },
        ]});
      }, 1000);
    });
  }

  /**
   * After 1 second, resolves a promise with a JSON array representing pickup times at all shelters.
   * Array is made of of objects containing:
   * - sName: string
   * - cName: string
   * - aName: string
   * - licenseNo: int
   * - pickupTime: 
   * - pickupDate: Date
   * @returns {Promise<any>}
   */
  static getPickupTimes() {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve({code: 200, body: [
          {
            sName: "Broadway West",
            cName: "Jennifer Chow",
            aName: "Toby",
            licenseNo: 3467,
            pickupTime: null,
          },
          {
            sName: "Delta",
            cName: "Carmen Schuster",
            aName: "Fluffy",
            licenseNo: 7682,
            pickupTime: null,
          }
        ]});
      }, 1000);
    });
  }

  /**
   * After 1 second, resolves a promise with a JSON array representing preferred donors.
   *    (i.e. donors that have made at least one donation to every single shelter)
   * Array is made of of objects containing:
   * - cName: string
   * - cEmail: string
   * - cPhone: string
   * @returns {Promise<any>}
   */
  static getPreferredDonors() {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve({code: 200, body: [
          {
            cName: "Jennifer Chow",
            cEmail: "jennifer.chow@gmail.com",
            cPhone: "7789874829"
          },
          {
            cName: "Alex Ovechkin",
            cEmail: "ovie@hotmail.com",
            cPhone: "7789876363"
          }
        ]});
      }, 1000);
    });
  }
}