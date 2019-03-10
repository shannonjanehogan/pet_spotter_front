/**
 *  This is a mock class designed to mimic responses
 *  from the back-end with built-in delay.  It's assumed that
 *  the back-end will return responses in the form of JSON objects.
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
    setTimeout(function(){
      // TODO
      return {};
    }, 500);
  }

  static getPetsByShelter(request) {
    setTimeout(function(){
      // TODO
      return {};
    }, 500);
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