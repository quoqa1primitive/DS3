import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import Layout from './Layout';

import * as d3 from 'd3';
import _ from 'lodash'

let DataProcess = function(){
  this.parseCSV = async function(){
    let selectedRows = [];
    let data = await d3.csv("https://raw.githubusercontent.com/KimSeonGyeom/Git-Tutorial/master/children_and_elderly_per_100_adults.csv", function(d){
      return {
        country: d.country,
        "1970": d["1970"],
        "1975": d["1975"],
        "1980": d["1980"],
        "1985": d["1985"],
        "1990": d["1990"],
        "1995": d["1995"],
        "2000": d["2000"],
        "2005": d["2005"],
        "2010": d["2010"],
        "2015": d["2015"],
        "2020": d["2020"],
      }
    }).then(
      function(data){
        const selectedCountries = [
          'Czech Republic',
          'Mexico',
          'South Korea'
        ]
        data.map(x =>{
          if(selectedCountries.includes(x.country)){
            selectedRows.push(x);
          }
        });
      }
    )
    return selectedRows;
  }

  this.getCSV = async function(){
    const data = await this.parseCSV();
    return data;
  }
}

function Main(){
  const [layout, setLayout] = useState("CC");
  const [immersive, setImmersive] = useState(true);
  const [data, setData] = useState(undefined);

  useEffect(()=>{
    new DataProcess().getCSV().then((data) => {
      setData(data);
    })
  }, [])

  return(
    <div className="PageController">
      <div className="PageSelectors">
        <button id="SS-I" onClick={() => {setLayout("CC"); setImmersive(true);}}>SS-I</button>
        <button id="SS-N" onClick={() => {setLayout("CC"); setImmersive(false);}}>SS-N</button>
      </div>
      <Layout data={data} immersive={immersive} layout={layout}/>
    </div>
  )
}


export default Main;
