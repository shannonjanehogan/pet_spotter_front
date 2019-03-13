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

  static getTaxReceipt(request) {
    setTimeout(function(){
      // TODO
      return {};
    }, 500);
  }

  static getAllPets() {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve([
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
        ]);
      }, 1000);
    });
  }

  static getPetsByShelter(request) {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve([
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
        ]);
      }, 1000);
    });
  }

  static getDonationsByShelter(request) {
    setTimeout(function(){
      // TODO
      return {};
    }, 500);
  }

  static getPickupTimes() {
    setTimeout(function(){
      // TODO
      return {};
    }, 500);
  }
}