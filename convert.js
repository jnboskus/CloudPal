import xlsx from "xlsx";
import fs from "fs";
import path from "path";

const outputPath = path.join(process.cwd(), "Public", "groupedData.json");

const excelFile = "Public/worldcities.xlsx";
const workbook = xlsx.readFile(excelFile); 
const sheetName = workbook.SheetNames[0]; 
const sheet = workbook.Sheets[sheetName];
const rows = xlsx.utils.sheet_to_json(sheet, { defval: null }); 

const groupedData = {};
rows.forEach((row)=>{
    const country = row.Country;
    const city = row.City;
    if(!groupedData[country]){
        groupedData[country] = [];
    }
    groupedData[country].push(city);

    
    
}); 

Object.keys(groupedData).forEach(country => { 
    groupedData[country].sort((a, b) => a.localeCompare(b)); 

});


const sortedCountries = Object.keys(groupedData).sort((a, b) => a.localeCompare(b));

const sortedGroupedData = {}; 
sortedCountries.forEach(country => { 
    sortedGroupedData[country] = groupedData[country]; 
});

console.log(sortedGroupedData);


fs.writeFileSync(outputPath, JSON.stringify(sortedGroupedData, null, 2), "utf-8");

