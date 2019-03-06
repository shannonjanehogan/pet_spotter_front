import React, { Component } from 'react';
import cat from './images/cat.svg';
import dog from './images/dog.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ReactDOM from 'react-dom';

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
            onClick={() => this.setState({ donorModalShow: true })}>
            Donor
          </Button>
          <DonorModal
              show={this.state.donorModalShow}
              onHide={this.handleHide}
          />

          <Button
              variant="info"
              onClick={() => this.setState({ ownerModalShow: true })}>
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
        Icon made by <a
          className={"App-link"}
          href={"https://www.flaticon.com/authors/freepik"}
          target="_blank">
          Freepik{" "}
        </a>
        from <a
          className={"App-link"}
          href={"https://flaticon.com"}
          target="_blank">
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
          class={"app-modal donor-modal"}
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
            <Tab eventKey="donor-history" title="View donor history">
              <DonorHistoryForm/>
            </Tab>
            <Tab eventKey="receipt" title="Get tax receipt">
              <TaxReceiptForm/>
            </Tab>
            <Tab eventKey="donor-info" title="Add/Update info">
              <ClientInfoForm/>
            </Tab>
            <Tab eventKey="shelter-history" title="View shelter history">
              <ShelterHistory/>
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
            <Tab eventKey="pets" title="View pets">
              <p>Test2</p>
            </Tab>
            <Tab eventKey="apply" title="Apply to adopt">
              <p>Test</p>
            </Tab>
            <Tab eventKey="owner-info" title="Add/Update info">
              <ClientInfoForm/>
            </Tab>
            <Tab eventKey="adoption-history" title="View adoption history">
              <OwnerHistoryForm/>
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
          <Tabs defaultActiveKey="applications" id="shelter-tabs">
            <Tab eventKey="applications" title="View pending applications">
              <p>Test2</p>
            </Tab>
            <Tab eventKey="pickup" title="Arrange a pickup">
              <p>Test</p>
            </Tab>
            <Tab eventKey="pet-info" title="Add/Update pet info">
              <PetInfoForm/>
            </Tab>
            <Tab eventKey="shelter-history" title="Update shelter info">
              <ShelterInfoForm/>
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
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
  }

  render() {
    const { validated } = this.state;
    return(
        <Form
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}
        >
          <Form.Group controlId="formDonationPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="phone-number" placeholder="6045555555" required/>
          </Form.Group>
          <Form.Group controlId="formDonationAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" placeholder="20.00" required/>
          </Form.Group>
          <Form.Group controlId="formDonationNameToCredit">
            <Form.Label>Name to credit</Form.Label>
            <Form.Control type="name" placeholder="Anonymous" />
          </Form.Group>
          <Form.Group controlId="formDonationShelter">
            <Form.Label>Choose a shelter to donate to</Form.Label>
            <Form.Control as="select">
              <option>Broadway West</option>
              <option>Richmond South</option>
              <option>Burnaby</option>
              <option>Delta</option>
              <option>Surrey South</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDonationDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows="3" placeholder="Thank you!" />
          </Form.Group>
          <Button type="submit">Donate!</Button>
        </Form>
    );
  }
}

class DonorHistoryForm extends React.Component {
  /**
   *  Handle submission event by making request to back-end API
   */
  handleSubmit(event) {
    // TODO
  }

  render() {
    return(
        <Form>
          <Form.Group controlId="formDonorHistoryPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="phone-number" placeholder="6045555555" required/>
          </Form.Group>
          <Button type="submit">Get my donation history</Button>
        </Form>
    );
  }
}

class TaxReceiptForm extends React.Component {
  /**
   *  Handle submission event by making request to back-end API
   */
  handleSubmit(event) {
    // TODO
  }

  render() {
    return(
        <Form>
          <Form.Group controlId="formDonorTaxPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="phone-number" placeholder="6045555555" required/>
          </Form.Group>
          <Button type="submit">Get my tax receipt for the current year</Button>
        </Form>
    );
  }
}

class ClientInfoForm extends React.Component {
  /**
   *  Handle submission event by making request to back-end API
   */
  handleSubmit(event) {
    // TODO
  }

  render() {
    return(
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formClientPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type="phone-number" placeholder="6045555555" required/>
            </Form.Group>
            <Form.Group as={Col} controlId="formClientName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="John Smith"/>
            </Form.Group>
            <Form.Group as={Col} controlId="formClientEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="me@example.com"/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formClientHouseNumber">
              <Form.Label>House number</Form.Label>
              <Form.Control type="number" placeholder="Enter house number" />
            </Form.Group>

            <Form.Group as={Col} controlId="formClientStreetName">
              <Form.Label>Street</Form.Label>
              <Form.Control type="street" placeholder="Enter street name" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formClientCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="name" placeholder="Vancouver" />
            </Form.Group>

            <Form.Group as={Col} controlId="formClientProvince">
              <Form.Label>Province</Form.Label>
              <Form.Control as="select">
                <option>BC</option>
                <option>AB</option>
                <option>ON</option>
                <option>NL</option>
                <option>PE</option>
                <option>NS</option>
                <option>NB</option>
                <option>QC</option>
                <option>MB</option>
                <option>SK</option>
                <option>YT</option>
                <option>NT</option>
                <option>NU</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formClientPostalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control type="postal-code" placeholder="A1A 1A1" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formClientPetsOwned">
            <Form.Label>Pets Owned (Optional)</Form.Label>
            <Form.Control type="number" placeholder="0" />
          </Form.Group>

          <Button type="submit">Add/Update Info</Button>
        </Form>
    );
  }
}

class ShelterHistory extends React.Component {
  /**
   *  Handle submission event by making request to back-end API
   */
  handleSubmit(event) {
    // TODO
  }

  render() {
    return(
        <Form>
          <Form.Group controlId="formShelterHistoryDonations">
            <Form.Label>Choose a shelter</Form.Label>
            <Form.Control as="select">
              <option>Broadway West</option>
              <option>Richmond South</option>
              <option>Burnaby</option>
              <option>Delta</option>
              <option>Surrey South</option>
            </Form.Control>
          </Form.Group>
          <Button type="submit">View donations for a shelter</Button>
        </Form>
    );
  }
}

class OwnerHistoryForm extends React.Component {
  /**
   *  Handle submission event by making request to back-end API
   */
  handleSubmit(event) {
    // TODO
  }

  render() {
    return(
        <Form>
          <Form.Group controlId="formOwnerHistoryPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="phone-number" placeholder="6045555555" required/>
          </Form.Group>
          <Button type="submit">Get my adoption history</Button>
        </Form>
    );
  }
}

class PetInfoForm extends React.Component {
  /**
   *  Handle submission event by making request to back-end API
   */
  handleSubmit(event) {
    // TODO
  }

  render() {
    return(
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formPetName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder="Rocky"/>
            </Form.Group>
            <Form.Group as={Col} controlId="formPetSpecies">
              <Form.Label>Species</Form.Label>
              <Form.Control type="name"/>
            </Form.Group>
            <Form.Group as={Col} controlId="formPetBreed">
              <Form.Label>Breed</Form.Label>
              <Form.Control type="name"/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formPetLicense">
              <Form.Label>License Number</Form.Label>
              <Form.Control type="number" placeholder="0001"/>
            </Form.Group>
            <Form.Group as={Col} controlId="formPetAge">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number"/>
            </Form.Group>
            <Form.Group as={Col} controlId="formPetWeight">
              <Form.Label>Weight</Form.Label>
              <Form.Control type="number"/>
            </Form.Group>
            <Form.Group as={Col} controlId="formPetGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control as={"select"}>
                <option>M</option>
                <option>F</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group controlId="formPetShelter">
              <Form.Label>Shelter</Form.Label>
              <Form.Control as="select">
                <option>Broadway West</option>
                <option>Richmond South</option>
                <option>Burnaby</option>
                <option>Delta</option>
                <option>Surrey South</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Button type="submit">Add/Update Info</Button>
        </Form>
    );
  }
}

class ShelterInfoForm extends React.Component {
  /**
   *  Handle submission event by making request to back-end API
   */
  handleSubmit(event) {
    console.log("Shelter phone number: " + ReactDOM.findDOMNode(this.refs.formShelterInfoPhone).value);
    console.log("Shelter name: " + ReactDOM.findDOMNode(this.refs.formShelterInfoName).value);
    console.log("Shelter email address: " + ReactDOM.findDOMNode(this.refs.formShelterInfoEmail).value);
    event.preventDefault();
  }

  render() {
    return(
        <Form
            onSubmit={e => this.handleSubmit(e)}
        >
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Phone number</Form.Label>
              <Form.Control ref="formShelterInfoPhone" type="phone-number" placeholder="6045555555" required/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>
              <Form.Control ref="formShelterInfoName" type="name" placeholder="Broadway West"/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Email address</Form.Label>
              <Form.Control ref="formShelterInfoEmail" type="email" placeholder="me@shelters.ca"/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formShelterHouseNumber">
              <Form.Label>House number</Form.Label>
              <Form.Control type="number" placeholder="Enter house number" />
            </Form.Group>

            <Form.Group as={Col} controlId="formShelterStreetName">
              <Form.Label>Street</Form.Label>
              <Form.Control type="street" placeholder="Enter street name" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formShelterCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="name" placeholder="Vancouver" />
            </Form.Group>

            <Form.Group as={Col} controlId="formShelterProvince">
              <Form.Label>Province</Form.Label>
              <Form.Control as="select">
                <option>BC</option>
                <option>AB</option>
                <option>ON</option>
                <option>NL</option>
                <option>PE</option>
                <option>NS</option>
                <option>NB</option>
                <option>QC</option>
                <option>MB</option>
                <option>SK</option>
                <option>YT</option>
                <option>NT</option>
                <option>NU</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formShelterPostalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control type="postal-code" placeholder="A1A 1A1" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formShelterCapacity">
              <Form.Label>Maximum capacity</Form.Label>
              <Form.Control type="number" placeholder="20" />
            </Form.Group>
          </Form.Row>

          <Button type="submit">Add/Update Info</Button>
        </Form>
    );
  }
}

export default App;
