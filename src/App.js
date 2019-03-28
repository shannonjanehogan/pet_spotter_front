import React, { Component } from 'react';
import cat from './images/cat.svg';
import dog from './images/dog.svg';
import logo from './images/top-img.PNG';
import './App.css';
import PetsApi from './PetApi';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ReactDOM from 'react-dom';

const BROADWAY_WEST_PHONE  = "6045550000";
const RICHMOND_SOUTH_PHONE = "6045551111";
const BURNABY_PHONE        = "6045552222";
const DELTA_PHONE          = "6045553333";
const SURREY_SOUTH_PHONE   = "6045554444";

// If you are editing the responses from the back-end
// or handling queries to be sent, do that from the
// nine classes below under "CLIENTS" or "SHELTER
// VOLUNTEER".  Entry-points for functionality are
// indicated with TODO statements.

///////////////////////
/*      CLIENTS      */
///////////////////////

class ClientInfoForm extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { validated: false };
  }

  /**
   *  Handle submission event by making request to back-end API
   */
  async handleSubmit(event) {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({ validated: true });
    } else {
      this.setState({ validated: true });

      let cPhone = ReactDOM.findDOMNode(this.refs.formClientPhone).value;
      this.request = {
        name:       ReactDOM.findDOMNode(this.refs.formClientName).value,
        houseNo:    ReactDOM.findDOMNode(this.refs.formClientHouseNumber).value,
        street:     ReactDOM.findDOMNode(this.refs.formClientStreetName).value,
        postalCode: ReactDOM.findDOMNode(this.refs.formClientPostalCode).value,
        email:      ReactDOM.findDOMNode(this.refs.formClientEmail).value,
        city:        ReactDOM.findDOMNode(this.refs.formClientCity).value,
        province:    ReactDOM.findDOMNode(this.refs.formClientProvince).value
      };

      console.log("Request for ClientInfoForm");
      console.log(this.request);

      await PetsApi.updateClient(cPhone, this.request).then(
          res => {
            console.log(res);
            this.renderResponse(res);
          }
      )
    }
  }

  /**
   * Handle and render response
   * @param response
   */
  renderResponse(response) {
    console.log(response);
    if (response) {
      ReactDOM.findDOMNode(this.refs.clientInfoTextSuccess).style = "display: block";
    }
  }

  render() {
    const { validated } = this.state;
    return(
        <div>
          <Form
              noValidate
              validated={validated}
              onSubmit={e => this.handleSubmit(e)}
          >
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Phone number</Form.Label>
                <Form.Control ref="formClientPhone" type="phone-number" placeholder="7785555555" required/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control ref="formClientName" type="name" placeholder="John Smith" required/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Email address</Form.Label>
                <Form.Control ref="formClientEmail" type="email" placeholder="me@example.com" required/>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>House number</Form.Label>
                <Form.Control ref="formClientHouseNumber" type="number" placeholder="Enter house number" required/>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Street</Form.Label>
                <Form.Control ref="formClientStreetName" type="street" placeholder="Enter street name" required/>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control ref="formClientCity" type="name" placeholder="Vancouver" required/>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Province</Form.Label>
                <Form.Control ref="formClientProvince" as="select" required>
                  <option value={null}>{}</option>
                  <option value={"BC"}>BC</option>
                  <option value={"AB"}>AB</option>
                  <option value={"ON"}>ON</option>
                  <option value={"NL"}>NL</option>
                  <option value={"PE"}>PE</option>
                  <option value={"NS"}>NS</option>
                  <option value={"NB"}>NB</option>
                  <option value={"QC"}>QC</option>
                  <option value={"MB"}>MB</option>
                  <option value={"SK"}>SK</option>
                  <option value={"YT"}>YT</option>
                  <option value={"NT"}>NT</option>
                  <option value={"NU"}>NU</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control ref="formClientPostalCode" type="postal-code" placeholder="A1A 1A1" required/>
              </Form.Group>
            </Form.Row>

            <Button type="submit">Add/Update Info</Button>
          </Form>

          <div className={"text-success"} ref={"clientInfoTextSuccess"}>
            <p>Info successfully updated!</p>
          </div>
        </div>
    );
  }
}

/*      DONORS       */

class DonationForm extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { validated: false };
  }

  /**
   *  Handle submission event by making request to back-end API
   */
  async handleSubmit(event) {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({ validated: true });
    } else {
      this.setState({ validated: true });

      let amount = Number(ReactDOM.findDOMNode(this.refs.formDonationAmount).value);
      let nameToCredit = ReactDOM.findDOMNode(this.refs.formDonationNameToCredit).value;
      let description = ReactDOM.findDOMNode(this.refs.formDonationDescription).value;
      let date = new Date();

      this.request = {
        cPhone: ReactDOM.findDOMNode(this.refs.formDonationPhone).value,
        amount: amount,
        sPhone: ReactDOM.findDOMNode(this.refs.formDonationShelter).value,
        name: (nameToCredit === "") ? "Anonymous" : nameToCredit,
        message: (description === "") ? null : description,
        date: date.toISOString()
      };

      console.log("Request for DonationForm");
      console.log(this.request);

      await PetsApi.createDonation(this.request).then(
          res => {
            console.log(res);
            this.renderResponse(res);
          }
      )
    }
  }

  /**
   * Handle and render response
   * @param response
   */
  renderResponse(response) {
    console.log(response);
    if (response) {
      ReactDOM.findDOMNode(this.refs.donationTextSuccess).style = "display: block";
    }
  }

  render() {
    const { validated } = this.state;
    return(
        <div>
          <Form
              noValidate
              validated={validated}
              onSubmit={e => this.handleSubmit(e)}
          >
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Phone number</Form.Label>
                <Form.Control ref="formDonationPhone" type="phone-number" placeholder="7785555555" required/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Amount</Form.Label>
                <Form.Control ref="formDonationAmount" type="text" placeholder="20.00" required/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Name to credit</Form.Label>
                <Form.Control ref="formDonationNameToCredit" type="name" placeholder="Anonymous"/>
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label>Choose a shelter to donate to</Form.Label>
              <Form.Control ref="formDonationShelter" as="select" required>
                <option value={null}>{}</option>
                <option value={BROADWAY_WEST_PHONE}>Broadway West</option>
                <option value={RICHMOND_SOUTH_PHONE}>Richmond South</option>
                <option value={BURNABY_PHONE}>Burnaby</option>
                <option value={DELTA_PHONE}>Delta</option>
                <option value={SURREY_SOUTH_PHONE}>Surrey South</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control ref="formDonationDescription" as="textarea" rows="3" placeholder="Write a friendly message here!" defaultValue={null}/>
            </Form.Group>
            <Button type="submit">Donate!</Button>
          </Form>

          <div className={"text-success"} ref={"donationTextSuccess"}>
            <p>Thank you!  We've successfully received your donation.</p>
          </div>
        </div>
    );
  }
}

class TaxReceiptForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: {
        cname: null,
        sum: 0,
        count: 0,
      },
    };

    let date = new Date();
    this.setState({date: date});
  }

  /**
   *  Handle submission event by making request to back-end API
   */
  async handleSubmit(e) {
    e.preventDefault();
    let cPhone = ReactDOM.findDOMNode(this.refs.formTaxReceiptPhone).value;

    console.log("Request for TaxReceiptForm.  ID: " + cPhone);

    await PetsApi.getTaxReceipt(cPhone).then(
        res => {
          this.renderResponse(res[0]);
        }
    );
  }

  /**
   * Handle and render response
   * @param response
   */
  renderResponse(response) {
    console.log(response);
    if (response) {
      this.setState({data: response});
      ReactDOM.findDOMNode(this.refs.taxReceiptText).style = "display: block";
    }
  }

  render() {
    let d = new Date();
    return(
        <div>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Form.Group>
              <Form.Label>Phone number</Form.Label>
              <Form.Control ref="formTaxReceiptPhone" type="phone-number" placeholder="7785555555" required/>
            </Form.Group>
            <Button type="submit">Get my tax receipt for 2018</Button>
          </Form>

          <div className={"tax-receipt-text"} ref={"taxReceiptText"}>
            <img src={logo} alt="receipt-header" />
            <h3>Official donation receipt for tax purposes</h3>
            <h6>Date issued: {d.toDateString()}</h6>
            <br/>
            <p>{this.state.data.cname} has made {this.state.data.count} donations totaling ${this.state.data.sum.toFixed(2)} to animal shelters in 2018.</p>
          </div>
        </div>
    );
  }
}



/*      OWNERS      */

class ViewAllPets extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: []
    };
  }

  /**
   *  Handle submission event by making request to back-end API
   */
  async handleSubmit(e) {
    e.preventDefault();

    console.log("Request for ViewAllPets");

    await PetsApi.getAllPets().then(
        res => {
          this.renderResponse(res);
        }
    );
  }

  /**
   * Handle and render response
   * @param response
   */
  renderResponse(response) {
    console.log(response);
    if (response) {
      this.setState({data: response});
      ReactDOM.findDOMNode(this.refs.tablePetsAll).style = "display: table";
    }
  }

  render() {
    return(
        <div>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Button type="submit">View all pets</Button>
          </Form>

          <Table ref={"tablePetsAll"} striped hover>
            <thead>
            <tr>
              <th>Housed at</th>
              <th>Name</th>
              <th>Age</th>
              <th>Weight</th>
              <th>Gender</th>
              <th>Species</th>
              <th>Breed</th>
              <th>Good with kids?</th>
              <th>Good with cats?</th>
              <th>Good with dogs?</th>
            </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
              return (
                  <tr key = {key}>
                    <td>{item.sname.trim()}</td>
                    <td>{item.aname.trim()}</td>
                    <td>{item.age}</td>
                    <td>{item.weight}</td>
                    <td>{item.gender}</td>
                    <td>{item.species.trim()}</td>
                    <td>{item.bname.trim()}</td>
                    <td>{(item.goodwithkids) ? <span className={"green-text"}>{"Yes"}</span> : <span className={"red-text"}>{"No"}</span>}</td>
                    <td>{(item.goodwithcats) ? <span className={"green-text"}>{"Yes"}</span> : <span className={"red-text"}>{"No"}</span>}</td>
                    <td>{(item.goodwithdogs) ? <span className={"green-text"}>{"Yes"}</span> : <span className={"red-text"}>{"No"}</span>}</td>
                  </tr>
              )
            })}</tbody>
          </Table>
        </div>
    );
  }
}

class ViewPetsByShelter extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: []
    };
  }

  /**
   *  Handle submission event by making request to back-end API
   */
  async handleSubmit(e) {
    e.preventDefault();
    let sPhone = ReactDOM.findDOMNode(this.refs.formPetsByShelter).value;

    console.log("Request for ViewPetsByShelter.  ID: " + sPhone);

    await PetsApi.getPetsByShelter(sPhone).then(
        res => {
          this.renderResponse(res);
        }
    );

  }

  /**
   * Handle and render response
   * @param response
   */
  renderResponse(response) {
    console.log(response);
    if (response) {
      this.setState({data: response});
      ReactDOM.findDOMNode(this.refs.tablePetsByShelter).style = "display: table";
    }
  }

  render() {
    return(
        <div>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Form.Group>
              <Form.Label>Choose a shelter</Form.Label>
              <Form.Control ref="formPetsByShelter" as="select">
                <option value={BROADWAY_WEST_PHONE}>Broadway West</option>
                <option value={RICHMOND_SOUTH_PHONE}>Richmond South</option>
                <option value={BURNABY_PHONE}>Burnaby</option>
                <option value={DELTA_PHONE}>Delta</option>
                <option value={SURREY_SOUTH_PHONE}>Surrey South</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit">View pets by selected shelter</Button>
          </Form>

          <Table ref={"tablePetsByShelter"} striped hover>
            <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Weight</th>
              <th>Gender</th>
              <th>Species</th>
              <th>Breed</th>
              <th>Good with kids?</th>
              <th>Good with cats?</th>
              <th>Good with dogs?</th>
            </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
              return (
                  <tr key = {key}>
                    <td>{item.aname.trim()}</td>
                    <td>{item.age}</td>
                    <td>{item.weight}</td>
                    <td>{item.gender}</td>
                    <td>{item.species.trim()}</td>
                    <td>{item.bname.trim()}</td>
                    <td>{(item.goodwithkids) ? <span className={"green-text"}>{"Yes"}</span> : <span className={"red-text"}>{"No"}</span>}</td>
                    <td>{(item.goodwithcats) ? <span className={"green-text"}>{"Yes"}</span> : <span className={"red-text"}>{"No"}</span>}</td>
                    <td>{(item.goodwithdogs) ? <span className={"green-text"}>{"Yes"}</span> : <span className={"red-text"}>{"No"}</span>}</td>
                  </tr>
              )
            })}</tbody>
          </Table>
        </div>
    );
  }
}

class ViewSheltersAve extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: []
    };
  }

  /**
   *  Handle submission event by making request to back-end API
   */
  async handleSubmit(e) {
    e.preventDefault();

    console.log("Request for ViewSheltersAve");

    await PetsApi.getSheltersAve().then(
        res => {
          this.renderResponse(res);
        }
    );
  }

  /**
   * Handle and render response
   * @param response
   */
  renderResponse(response) {
    console.log(response);
    if (response) {
      this.setState({data: response});
      ReactDOM.findDOMNode(this.refs.tableSheltersAve).style = "display: table";
    }
  }

  render() {
    return(
        <div>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Button type="submit">See shelters with "Ave" in their address</Button>
          </Form>

          <Table ref={"tableSheltersAve"} striped hover>
            <thead>
            <tr>
              <th>Shelter Name</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Capacity</th>
              <th>House number</th>
              <th>Street</th>
            </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
              return (
                  <tr key = {key}>
                    <td>{item.sname.trim()}</td>
                    <td>{item.semail.trim()}</td>
                    <td>{item.sphone}</td>
                    <td>{item.capacity}</td>
                    <td>{item.gender}</td>
                    <td>{item.houseno}</td>
                    <td>{item.sstreet.trim()}</td>
                  </tr>
              )
            })}</tbody>
          </Table>
        </div>
    );
  }
}


///////////////////////
/* SHELTER VOLUNTEER */
///////////////////////

class DeleteDonation extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { validated: false };
  }

  /**
   *  Handle submission event by making request to back-end API
   */
  async handleSubmit(event) {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({ validated: true });
    } else {
      this.setState({ validated: true });

      let transactionID = ReactDOM.findDOMNode(this.refs.formDeleteDonationID).value;

      console.log("Request for DeleteDonation.  ID: " + transactionID);

      await PetsApi.deleteDonation(transactionID).then(
          res => {
            console.log(res);
            this.renderResponse(res);
          }
      )
    }
  }

  /**
   * Handle and render response
   * @param response
   */
  renderResponse(response) {
    console.log(response);
    if (response) {
      ReactDOM.findDOMNode(this.refs.deleteDonationTextSuccess).style = "display: block";
    }
  }

  render() {
    const { validated } = this.state;
    return(
        <div>
          <Form
              noValidate
              validated={validated}
              onSubmit={e => this.handleSubmit(e)}
          >
            <Form.Group>
              <Form.Label>Transaction ID</Form.Label>
              <Form.Control ref="formDeleteDonationID" type="number" placeholder="Enter transaction ID" required/>
            </Form.Group>
            <Button type="submit">Delete Donation</Button>
          </Form>

          <div className={"text-success"} ref={"deleteDonationTextSuccess"}>
            <p>Successfully deleted a donation.</p>
          </div>
        </div>
    );
  }
}

class ViewPickupTimes extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: []
    };
  }

  /**
   *  Handle submission event by making request to back-end API
   */
  async handleSubmit(e) {
    e.preventDefault();

    console.log("Request for ViewPickupTimes");

    await PetsApi.getAnimalPickups().then(
        res => {
          this.renderResponse(res);
        }
    );
  }

  /**
   * Handle and render response
   * @param response
   */
  renderResponse(response) {
    console.log(response);
    if (response) {
      this.setState({data: response});
      ReactDOM.findDOMNode(this.refs.tablePickupTimes).style = "display: table";
    }
  }

  render() {
    return(
        <div>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Button type="submit">View pickup times</Button>
          </Form>

          <Table ref={"tablePickupTimes"} striped hover>
            <thead>
            <tr>
              <th>Shelter</th>
              <th>Client</th>
              <th>Animal name</th>
              <th>Pickup time</th>
              <th>Pickup date</th>
            </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
              return (
                  <tr key = {key}>
                    <td>{item.sname.trim()}</td>
                    <td>{item.cname.trim()}</td>
                    <td>{item.aname.trim()}</td>
                    <td>{item.pickuptime.substring(11,16)}</td>
                    <td>{item.pickuptime.substring(0,10)}</td>
                  </tr>
              )
            })}</tbody>
          </Table>
        </div>
    );
  }
}

class TotalDonationsByShelter extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: []
    };
  }

  /**
   *  Handle submission event by making request to back-end API
   */
  async handleSubmit(e) {
    e.preventDefault();

    console.log("Request for TotalDonationsByShelter");

    await PetsApi.getDonations().then(
        res => {
          this.renderResponse(res);
        }
    );
  }

  /**
   * Handle and render response
   *
   * Response is an array is made of five objects containing:
   * - sName: string (one of ["Broadway West", "Richmond South", "Burnaby", "Delta", "Surrey South"])
   * - totalAmount: float
   * @param response
   */
  renderResponse(response) {
    console.log(response);
    if (response) {
      this.setState({data: response});
      ReactDOM.findDOMNode(this.refs.tableDonationsByShelter).style = "display: table";
    }
  }

  render() {
    return(
        <div>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Button type="submit">View total donations each shelter has received</Button>
          </Form>

          <Table ref={"tableDonationsByShelter"} striped hover>
            <thead>
            <tr>
              <th>Shelter</th>
              <th>Total donations received</th>
            </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
              return (
                  <tr key = {key}>
                    <td>{item.sname.trim()}</td>
                    <td>{item.sum.toFixed(2)}</td>
                  </tr>
              )
            })}</tbody>
          </Table>
        </div>
    );
  }
}

class PreferredDonors extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: []
    };
  }

  /**
   *  Handle submission event by making request to back-end API
   */
  async handleSubmit(e) {
    e.preventDefault();

    console.log("Request for PreferredDonors");

    await PetsApi.getDonors().then(
      res => {
        this.renderResponse(res);
      }
    );

  }

  /**
   * Handle and render response.  Expect that the back-end request returns a Promise with
   * an array of objects with necessary info
   *
   * Array is made of of objects containing:
   * - cName: string
   * - cEmail: string
   * - cPhone: string
   * @param response
   */
  renderResponse(response) {
    console.log(response);
    if (response) {
      this.setState({data: response});
      ReactDOM.findDOMNode(this.refs.tablePreferredDonors).style = "display: table";
    }
  }

  render() {
    return(
        <div>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Button type="submit">View preferred donors</Button>
          </Form>

          <Table ref={"tablePreferredDonors"} striped hover>
            <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
              return (
                  <tr key = {key}>
                    <td>{item.cname.trim()}</td>
                    <td>{item.cemail.trim()}</td>
                    <td>{item.cphone.trim()}</td>
                  </tr>
              )
            })}</tbody>
          </Table>
        </div>
    );
  }
}



/////////////////////////////////////
/*       MAIN UI FRAMEWORK        */
/* Below is the framework for the */
/* web app. No functionality is   */
/* found here.                    */
/////////////////////////////////////

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      donorModalShow: false,
      ownerModalShow: false,
      shelterModalShow: false
    };

    this.handleHide = () => {
      this.setState({
        donorModalShow: false,
        ownerModalShow: false,
        shelterModalShow: false
      });
    };
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={cat} className="App-logo" alt="logo" />
            <span>PetSpotter</span>
            <img src={dog} className="App-logo" alt="logo" />
          </header>
          <div className="App-body">
            <p>
              connecting furry friends with loving owners!
            </p>
            <p className={"Buttons-text"}>
              I am a...
            </p>
          </div>
          <ButtonToolbar>
            <Button
                variant="info"
                onClick={() => {
                  this.setState({ donorModalShow: true });
                }}>
              Donor
            </Button>
            <DonorModal
                show={this.state.donorModalShow}
                onHide={this.handleHide}
            />

            <Button
                variant="info"
                onClick={() => {
                  this.setState({ ownerModalShow: true });
                }}>
              Pet owner
            </Button>
            <OwnerModal
                show={this.state.ownerModalShow}
                onHide={this.handleHide}
            />

            <Button
                variant="info"
                onClick={() => this.setState({ shelterModalShow: true })}>
              Shelter volunteer
            </Button>
            <ShelterModal
                show={this.state.shelterModalShow}
                onHide={this.handleHide}
            />
          </ButtonToolbar>
          <footer>
            Icons made by <a
              className={"App-link"}
              href={"https://www.flaticon.com/authors/freepik"}
              target="_blank"
              rel="noopener noreferrer">
            Freepik{" "}
          </a>
            from <a
              className={"App-link"}
              href={"https://flaticon.com"}
              target="_blank"
              rel="noopener noreferrer">
            Flaticon.com</a>
          </footer>
        </div>
    );
  }
}

class DonorModal extends React.Component {
  render() {
    return (
        <Modal
            className={"app-modal donor-modal"}
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="owner-modal-title">
              Donor
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey="donate" id="donor-tabs">
              <Tab eventKey="donate" title="Donate">
                <DonationForm/>
              </Tab>
              <Tab eventKey="receipt" title="Get tax receipt">
                <TaxReceiptForm/>
              </Tab>
              <Tab eventKey="donor-info" title="Update info">
                <ClientInfoForm/>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

class OwnerModal extends React.Component {
  render() {
    return (
        <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="owner-modal-title">
              Pet Owner
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey="apply" id="owner-tabs">
              <Tab eventKey="pets" title="View all pets">
                <ViewAllPets/>
              </Tab>
              <Tab eventKey="apply" title="View pets by shelter">
                <ViewPetsByShelter/>
              </Tab>
              <Tab eventKey="owner-info" title="Update info">
                <ClientInfoForm/>
              </Tab>
              <Tab eventKey="shelters-ave" title="Shelters with 'Ave'">
                <ViewSheltersAve/>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

class ShelterModal extends React.Component {
  render() {
    return (
        <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="owner-modal-title">
              Shelter Volunteer
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey="pickup" id="shelter-tabs">
              <Tab eventKey="pickup" title="View pickup times">
                <ViewPickupTimes/>
              </Tab>
              <Tab eventKey="delete-donations" title="Delete a donation">
                <DeleteDonation/>
              </Tab>
              <Tab eventKey="donations-by-shelter" title="Get total donations by shelter">
                <TotalDonationsByShelter/>
              </Tab>
              <Tab eventKey="preferred-donors" title="View Preferred Donors">
                <PreferredDonors/>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default App;
