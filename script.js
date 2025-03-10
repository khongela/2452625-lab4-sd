//declare the components
var lblCountryName = document.querySelector(".countryName");
var lblCapital = document.querySelector(".capital");
var lblPopulation = document.querySelector(".population");
var lblRegion = document.querySelector(".region");
var imgCountryFlag = document.querySelector(".countryFlag");
var txtCountry;
var borderingList = document.querySelector(".borderingNames");
var shortCountry;

document.querySelector('.btnSubmit')
  .addEventListener('click', getCountryInfo)

async function getCountryInfo() {

  txtCountry = document.querySelector(".searchCountry").value;
  const apiUrl = `https://restcountries.com/v3.1/name/${txtCountry}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    const sName = json[0].name.common;
    const sCapital = json[0].capital[0];
    const iPopulation =  json[0].population;
    const sRegion = json[0].region;
    const imgURL = json[0].flags.png;

    lblCountryName.innerHTML = sName;
    lblCountryName.setAttribute("textContent",sName);
    lblCapital.innerHTML = "Capital: " + sCapital;
    lblPopulation.innerHTML = "Population: " + iPopulation.toLocaleString('en-US');
    lblRegion.innerHTML = "Region: " + sRegion;
    imgCountryFlag.src = imgURL;

    let arrBorderingCountries = [];
    arrBorderingCountries = json[0].borders;

    console.log(arrBorderingCountries);
    console.log(arrBorderingCountries.length);

    for (let k = 0; k < arrBorderingCountries.length; k++){
     
      shortCountry = arrBorderingCountries[k];
      //fetching full country name

      getBorderCountry();
      async function getBorderCountry() {
        const url = `https://restcountries.com/v3.1/alpha/${shortCountry}`;
        try{
          const borderResponse = await fetch(url);
          if(!borderResponse.ok){
            throw new Error(`Response status: ${borderResponse.status}`);
          }
          const borderJSON = await borderResponse.json();
          const COUNTRYName = borderJSON[0].name.common;
          const borderFlagSRC = borderJSON[0].flags.png;
          var li = document.createElement("li");
          li.textContent = COUNTRYName;
          borderingList.appendChild(li);

          var borderFlag = document.createElement("img");
          borderFlag.src = borderFlagSRC;
          borderFlag.height = 25;
          borderFlag.width = 25;
          borderingList.appendChild(borderFlag);


        }catch(error){
          console.log("bordering request problem");
        }
      }

    }
    
  } catch (error) {
    console.log("problem");
  }

}



