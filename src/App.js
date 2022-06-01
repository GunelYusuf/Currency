import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios  from 'axios';
import {useEffect, useState} from "react";
function App() {
  let myHeaders = new Headers();
  myHeaders.append("apikey", "Xl0NYFNLzMSGI1BiERBfx0DFyWHGOJyB");
  const [currentCurrency,setCurrentCurrency] = useState({});
  const [from, setFrom] = useState();
  const [input,setInput] = useState();
  const [convert,setConvert] = useState({
      'USD':null,
      'UAH':null,
      'EUR':null
  });


    useEffect(()=> {
        axios.get("https://api.apilayer.com/exchangerates_data/latest?symbols=EUR%2CUAH%2CUSD&base=USD",{
        headers:{
          "apikey": "Xl0NYFNLzMSGI1BiERBfx0DFyWHGOJyB",
        }
      })
          .then(result => {
            setCurrentCurrency(result.data.rates)
          })
          .catch(error => console.log('error', error));
    } ,[]);

    // useEffect(() =>{
    //     switch (from) {
    //         case "usd":
    //             convert.UAH=input*currentCurrency.UAH
    //             convert.EUR=input*currentCurrency.EUR
    //            break;
    //         case "uah":
    //             convert.EUR=input*currentCurrency.EUR
    //             convert.USD=input*currentCurrency.USD
    //             break;
    //         case "eur":
    //             convert.UAH=input*currentCurrency.UAH
    //             convert.USD=input*1.0733
    //             break;
    //     }
    // },[from,input])

   const CurrencyConvertor = (e) => {
     setFrom(e.target.name);
     setInput(e.target.value);
     console.log(convert)
       switch (from) {
           case "usd":
               convert.UAH=input*currentCurrency.UAH
               convert.EUR=input*currentCurrency.EUR
               break;
           case "uah":
               convert.EUR=input*currentCurrency.EUR
               convert.USD=input*currentCurrency.USD
               break;
           case "eur":
               convert.UAH=input*currentCurrency.UAH
               convert.USD=input*1.0733
               break;
       }
    }


  return (

    <div className="App">
      <div className="container">
         <div className="row">
           <div className="col-lg-4 col-xl-4 col-md-6 mb-3">
             <div className="containers-padding usd">
               <div className="currency-flag-usd"/>
               <div className="box-texts">
                 <span className="curr-code">USD</span>
               </div>
               <input type="number" name='usd' value={convert.USD}  onChange={e => {setFrom(e.target.name);setInput(e.target.value)}} className="form-control" placeholder='0'/>
                 <span className="price-to-comparison">1 USD = {currentCurrency.USD} USD</span>
             </div>
           </div>
           <div className="col-lg-4 col-md-6 col-xl-4 mb-3">
             <div className="containers-padding eur">
               <div className="currency-flag-eur"/>
               <div className="box-texts">
                 <span className="curr-code">EUR</span>
               </div>
               <input type="number" name='eur' value={from !== 'eur' && convert.EUR !== null ? convert.EUR : null}  onChange={CurrencyConvertor}  className="form-control" placeholder='0'/>

               <span className="price-to-comparison">1 USD = {currentCurrency.EUR} EUR </span>
             </div>
           </div>
           <div className="col-lg-4 col-md-6 col-xl-4 mb-3">
             <div className="containers-padding uah">
               <div className="currency-flag-uah"/>
               <div className="box-texts">
                 <span className="curr-code">UAH</span>
               </div>
               <input type="number"  name='uah' value={from !== 'uah' && convert.UAH !== null ? convert.UAH: null} onChange={CurrencyConvertor}  className="form-control" placeholder='0'/>

               <span className="price-to-comparison">1 USD = {currentCurrency.UAH} UAH</span>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}

export default App;
