import React, { Component } from 'react';
import cat from './images/cat.svg';
import dog from './images/dog.svg';
import logo from './images/top-img.PNG';
import './App.css';
import Mock from './Mock';
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

let HIDE_PETS_OWNED = false;

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
  handleSubmit(event) {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({ validated: true });
    } else {
      this.setState({ validated: true });

      this.request = {
        cPhone: ReactDOM.findDOMNode(this.refs.formClientPhone).value,
      };

      let cName       = ReactDOM.findDOMNode(this.refs.formClientName).value;
      let cEmail      = ReactDOM.findDOMNode(this.refs.formClientEmail).value;
      let cHouseNo    = ReactDOM.findDOMNode(this.refs.formClientHouseNumber).value;
      let cStreet     = ReactDOM.findDOMNode(this.refs.formClientStreetName).value;
      let city        = ReactDOM.findDOMNode(this.refs.formClientCity).value;
      let province    = ReactDOM.findDOMNode(this.refs.formClientProvince).value;
      let cPostalCode = ReactDOM.findDOMNode(this.refs.formClientPostalCode).value;
      let petsOwned   = ReactDOM.findDOMNode(this.refs.formClientPetsOwned).value;

      if (cName !== "")       {this.request.cName = cName;}
      if (cEmail !== "")      {this.request.cEmail = cEmail;}
      if (cHouseNo !== "")    {this.request.cHouseNo = Number(cHouseNo);}
      if (cStreet !== "")     {this.request.cStreet = cStreet;}
      if (city !== "")        {this.request.city = city;}
      if (province !== "")    {this.request.province = province;}
      if (cPostalCode !== "") {this.request.cPostalCode = cPostalCode;}
      if (petsOwned !== "")   {this.request.petsOwned = Number(petsOwned);}

      console.log("Request for ClientInfoForm");
      console.log(this.request);

      // TODO: Send request to back-end
    }
  }

  render() {
    const { validated } = this.state;
    return(
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
              <Form.Control ref="formClientName" type="name" placeholder="John Smith"/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Email address</Form.Label>
              <Form.Control ref="formClientEmail" type="email" placeholder="me@example.com"/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>House number</Form.Label>
              <Form.Control ref="formClientHouseNumber" type="number" placeholder="Enter house number" />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Street</Form.Label>
              <Form.Control ref="formClientStreetName" type="street" placeholder="Enter street name" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>City</Form.Label>
              <Form.Control ref="formClientCity" type="name" placeholder="Vancouver" />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Province</Form.Label>
              <Form.Control ref="formClientProvince" as="select">
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
              <Form.Control ref="formClientPostalCode" type="postal-code" placeholder="A1A 1A1" />
            </Form.Group>
          </Form.Row>

          <Form.Group id={"pets-owned"} className={(HIDE_PETS_OWNED) ? "hidden" : ""}>
            <Form.Label>Pets Owned (owners only)</Form.Label>
            <Form.Control ref="formClientPetsOwned" type="number" placeholder="0" disabled={HIDE_PETS_OWNED}/>
          </Form.Group>

          <Button type="submit">Add/Update Info</Button>
        </Form>
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
  handleSubmit(event) {
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

      this.request = {
        cPhone: ReactDOM.findDOMNode(this.refs.formDonationPhone).value,
        amount: amount,
        sPhone: ReactDOM.findDOMNode(this.refs.formDonationShelter).value,
        nameToCredit: (nameToCredit === "") ? "Anonymous" : nameToCredit,
        description: (description === "") ? null : description
      };

      console.log("Request for DonationForm");
      console.log(this.request);

      /** TODO: This request is missing the fields:
       * - Date
       * - TransactionID
       * Handle these two fields in the back-end.
       */

      // TODO: Send request to back-end
    }
  }

  render() {
    const { validated } = this.state;
    return(
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
    );
  }
}

class TaxReceiptForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: {
        cName: null,
        total: 0,
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
    this.request = {
      cPhone: ReactDOM.findDOMNode(this.refs.formTaxReceiptPhone).value
    };

    console.log("Request for TaxReceiptForm");
    console.log(this.request);

    // TODO: Replace mock request with real back-end request
    let response = await Mock.getTaxReceipt(this.request);
    this.renderResponse(response);
  }

  /**
   * Handle and render response
   * @param response
   */
  renderResponse(response) {
    console.log(response);
    this.setState({data: response});
    ReactDOM.findDOMNode(this.refs.taxReceiptText).style="display: block";
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
            <Button type="submit">Get my tax receipt for 2019</Button>
          </Form>

          <div className={"tax-receipt-text"} ref={"taxReceiptText"}>
            <img src={logo} alt="receipt-header" />
            <h3>Official donation receipt for tax purposes</h3>
            <h6>Date issued: {d.toDateString()}</h6>
            <br/>
            <p>{this.state.data.cName} has donated ${this.state.data.total.toFixed(2)} to animal shelters in 2019.</p>
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

    // TODO: Replace mock request with real back-end request
    // Expect that the back-end request returns a Promise with
    //   an array of objects with necessary info
    let response = await Mock.getAllPets();
    this.renderResponse(response);
  }

  /**
   * Handle and render response
   * @param response
   */
  renderResponse(response) {
    console.log(response);
    this.setState({data: response});
    ReactDOM.findDOMNode(this.refs.tablePetsAll).style="display: table";
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
                    <td>{item.sName}</td>
                    <td>{item.aName}</td>
                    <td>{item.age}</td>
                    <td>{item.weight}</td>
                    <td>{item.gender}</td>
                    <td>{item.species}</td>
                    <td>{item.breed}</td>
                    <td>{(item.goodWithKids) ? <span className={"green-text"}>{"Yes"}</span> : <span className={"red-text"}>{"No"}</span>}</td>
                    <td>{(item.goodWithCats) ? <span className={"green-text"}>{"Yes"}</span> : <span className={"red-text"}>{"No"}</span>}</td>
                    <td>{(item.goodWithDogs) ? <span className={"green-text"}>{"Yes"}</span> : <span className={"red-text"}>{"No"}</span>}</td>
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
    this.request = {
      sPhone: ReactDOM.findDOMNode(this.refs.formPetsByShelter).value
    };

    console.log("Request for ViewPetsByShelter");
    console.log(this.request);

    // TODO: Replace mock request with real back-end request
    // Expect that the back-end request returns a Promise with
    //   an array of objects with necessary info
    let response = await Mock.getPetsByShelter(this.request);
    this.renderResponse(response);
  }

  /**
   * Handle and render response
   * @param response
   */
  renderResponse(response) {
    console.log(response);
    this.setState({data: response});
    ReactDOM.findDOMNode(this.refs.tablePetsByShelter).style="display: table";
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
                    <td>{item.aName}</td>
                    <td>{item.age}</td>
                    <td>{item.weight}</td>
                    <td>{item.gender}</td>
                    <td>{item.species}</td>
                    <td>{item.breed}</td>
                    <td>{(item.goodWithKids) ? <span className={"green-text"}>{"Yes"}</span> : <span className={"red-text"}>{"No"}</span>}</td>
                    <td>{(item.goodWithCats) ? <span className={"green-text"}>{"Yes"}</span> : <span className={"red-text"}>{"No"}</span>}</td>
                    <td>{(item.goodWithDogs) ? <span className={"green-text"}>{"Yes"}</span> : <span className={"red-text"}>{"No"}</span>}</td>
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
  handleSubmit(event) {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({ validated: true });
    } else {
      this.setState({ validated: true });

      this.request = {
        transactionID: ReactDOM.findDOMNode(this.refs.formDeleteDonationID).value,
      };

      console.log("Request for DeleteDonation");
      console.log(this.request);

      // TODO: Make back-end request
    }
  }

  render() {
    const { validated } = this.state;
    return(
        <Form
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}
        >
          <Form.Group>
            <Form.Label>Transaction ID</Form.Label>
            <Form.Control ref="formDeleteDonationID" type="text" placeholder="Enter transaction ID" required/>
          </Form.Group>
          <Button type="submit">Delete Donation</Button>
        </Form>
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

    // TODO: Replace mock request with real back-end request
    let response = await Mock.getPickupTimes();
    this.renderResponse(response);
  }

  /**
   * Handle and render response
   * @param response
   */
  renderResponse(response) {
    console.log(response);
    this.setState({data: response});
    ReactDOM.findDOMNode(this.refs.tablePickupTimes).style="display: table";
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
              <th>Animal license number</th>
              <th>Pickup date</th>
              <th>Pickup time</th>
            </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
              return (
                  <tr key = {key}>
                    <td>{item.sName}</td>
                    <td>{item.cName}</td>
                    <td>{item.aName}</td>
                    <td>{item.licenseNo}</td>
                    <td>{item.pickupDate}</td>
                    <td>{item.pickupTime}</td>
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

    // TODO: Replace mock request with real back-end request
    let response = await Mock.getDonationsByShelter();
    this.renderResponse(response);
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
    this.setState({data: response});
    ReactDOM.findDOMNode(this.refs.tableDonationsByShelter).style="display: table";
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
                    <td>{item.sName}</td>
                    <td>{item.totalAmount.toFixed(2)}</td>
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

    // TODO: Replace mock request with real back-end request
    let response = await Mock.getPreferredDonors();
    this.renderResponse(response);
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
    this.setState({data: response});
    ReactDOM.findDOMNode(this.refs.tablePreferredDonors).style="display: table";
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
                    <td>{item.cName}</td>
                    <td>{item.cEmail}</td>
                    <td>{item.cPhone}</td>
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
                  HIDE_PETS_OWNED = true;
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
                  HIDE_PETS_OWNED = false;
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
