const csv = require('csv-parser');
const fs = require('fs');
const filePath = "costmetologyData/";
const resultsBarbers =  async () => {
    const results = [];
    var name = filePath + "ltbarber.csv";
    fs.createReadStream(name)
    .pipe(csv("LICENSE TYPE","LICENSE NUMBER","LICENSE EXPIRATION DATE","COUNTY","NAME","MAILING ADDRESS LINE1","MAILING ADDRESS LINE2","MAILING ADDRESS CITY, STATE ZIP","PHONE NUMBER","BUSINESS NAME","BUSINESS ADDRESS-LINE1","BUSINESS ADDRESS-LINE2","BUSINESS CITY, STATE ZIP","BUSINESS COUNTY CODE","BUSINESS COUNTY","BUSINESS ZIP","BUSINESS PHONE","LICENSE SUBTYPE","CONTINUING EDUCATION FLAG"
    ))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(results);
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]
    });
};

const resultsCosmetologists =  async () => {
    var name = filePath + "ltcos_op.csv";
    const results = [];
    fs.createReadStream(name)
    .pipe(csv("LICENSE TYPE","LICENSE NUMBER","LICENSE EXPIRATION DATE","COUNTY","NAME","MAILING ADDRESS LINE1","MAILING ADDRESS LINE2","MAILING ADDRESS CITY, STATE ZIP","PHONE NUMBER","BUSINESS NAME","BUSINESS ADDRESS-LINE1","BUSINESS ADDRESS-LINE2","BUSINESS CITY, STATE ZIP","BUSINESS COUNTY CODE","BUSINESS COUNTY","BUSINESS ZIP","BUSINESS PHONE","LICENSE SUBTYPE","CONTINUING EDUCATION FLAG"
    ))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(results);
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]
    });
};
 

export const ALLELIGIBLE = async () => { return [resultsBarbers() + resultsCosmetologists()]};