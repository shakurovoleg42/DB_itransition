import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CSVLink, CSVDownload } from "react-csv";

export default function Header({
 selectedCountry = () => {},
 randomNumber = () => {},
 getCsv = () => {},
 errors = () => {},
 allData,
}) {
 const [country, setCountry] = useState("Choose country");
 const [rnn, setRnn] = useState("");
 const [error, setError] = useState(0);
 const randomRange = 10_000_000;
 let countries = [
  { USA: "en_US" },
  { Georgian: "ge" },
  { Deutschland: "de" },
 ];

 useEffect(() => {
  let r = Math.floor(Math.random() * randomRange);
  randomNumber(r);
  setRnn(r);
 }, []);

 return (
  <Navbar
   variant="dark"
   style={{
    backgroundColor: "#32353850",
    backdropFilter: "blur(10px)",
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
   }}
   expand="lg"
  >
   <Container fluid>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="me-2 border p-1 rounded-2 border-secondary">
      <Dropdown>
       <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
        {country}
       </Dropdown.Toggle>
       <Dropdown.Menu variant="dark">
        {countries.map((country) => (
         <Dropdown.Item
          key={Object.values(country)}
          onClick={() => {
           selectedCountry(Object.values(country));
           setCountry(Object.keys(country));
          }}
         >
          {Object.keys(country)}
         </Dropdown.Item>
        ))}
       </Dropdown.Menu>
      </Dropdown>
     </Nav>

     <Nav className="me-2 d-flex border p-1 rounded-2 border-secondary">
      <Form.Control
       className="me-2"
       aria-label="Recipient's username"
       aria-describedby="basic-addon2"
       value={rnn}
       onChange={(e) => {
        setRnn(e.target.value);
        randomNumber(e.target.value);
       }}
      />
      <Button
       variant="primary"
       onClick={() => {
        let grn = Math.floor(Math.random() * randomRange);
        setRnn(grn);
        randomNumber(grn);
       }}
      >
       Random
      </Button>
     </Nav>

     <Nav
      className="ms-2 d-flex align-items-center border p-1 rounded-2 border-secondary"
      style={{ width: "100%" }}
     >
      <Form.Control
       aria-label="Recipient's username"
       aria-describedby="basic-addon2"
       style={{ width: "19%" }}
       value={error}
       onChange={(e) => {
        setError(e.target.value);
        errors(e.target.value);
       }}
       type="number"
       max={1000}
       min={0}
      />
      <Form.Range
       className="mx-2"
       value={error}
       max={10}
       min={0}
       step={0.5}
       style={{ width: "100%" }}
       onChange={(e) => {
        setError(e.target.value);
        errors(e.target.value);
       }}
      />
     </Nav>
     <Nav className="ms-2 border p-1 rounded-2 border-secondary">
      <CSVLink data={allData}>
       <Button onClick={getCsv} style={{ width: "100px" }} variant="success">
        Get CSV
       </Button>
      </CSVLink>
      ;
     </Nav>
    </Navbar.Collapse>
   </Container>
  </Navbar>
 );
}