import Header from "./components/Header";
import Data from "./components/Data";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

function App() {
 const [country, setCountry] = useState("fr");
 const [rnn, setRnn] = useState("");
 const [error, setError] = useState(0);
 const [allData, setAllData] = useState([]);
 const [page, setPage] = useState(1);

 const nextTen = (p) => {
  setPage(page + 1);
 };

 const selectedCountry = (c) => {
  generateData(rnn, c, page);
  setCountry(c);
 };
 const randomNumber = (r) => {
  generateData(r, country, page);
  setRnn(r);
 };
 const errors = (e) => {
  setError(parseFloat(e));
 };

 function insertError(data) {
  const r = error;
  let rs = ["a", "s", "d"];
  let re = rs[Math.floor(Math.random() * 3)];
  let errorData = data;
  function sw(str, first, last) {
   return (
    str.substr(0, first) +
    str[last] +
    str.substring(first + 1, last) +
    str[first] +
    str.substr(last + 1)
   );
  }

  switch (re) {
   case "d":
    errorData = data.substring(0, r - 1) + data.substring(r, data.length);
    break;
   case "a":
    errorData = data.slice(0, r) + r + data.slice(r);
    break;
   case "s":
    if (data.length > 1) {
     if (r == data.length - 1) {
      errorData = sw(data, r, r - 1);
     } else {
      errorData = sw(data, r, r + 1);
     }
    }
    break;
  }

  return errorData;
 }

 function generateData(r, c, p) {
  faker.locale = c;
  faker.seed(Number(r));
  let all = [];
  let dataNum = p === 1 ? 20 : (p + 1) * 10;
  for (let i = 0; i < dataNum; i++) {
   all.push([
    error === 0
     ? faker.random.numeric(5)
     : insertError(faker.random.numeric(5)),
    error === 0 ? faker.name.fullName() : insertError(faker.name.fullName()),
    error === 0
     ? `${faker.address.city()}, ${faker.address.street()}`
     : insertError(`${faker.address.city()}, ${faker.address.street()}`),
    error === 0 ? faker.phone.number() : insertError(faker.phone.number()),
   ]);
  }
  setAllData([...all]);
 }

 useEffect(() => {
  if (page > 1) {
   generateData(rnn, country, page);
  }
  if (error > 0) {
   generateData(rnn, country, page);
  }
 }, [page, error]);

 return (
  <div className="App" style={{ padding: "100px 50px " }}>
   <Header
    selectedCountry={selectedCountry}
    randomNumber={randomNumber}
    errors={errors}
    allData={allData}
   />
   <Data dataNum={allData} nextTen={nextTen} />
  </div>
 );
}

export default App;
