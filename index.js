import express from "express";
import axios from "axios";
import xlsx from "xlsx";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app=express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}))
app.use(express.static("Public"));


// const excelFile = "Public/worldcities.xlsx";
// const workbook = xlsx.readFile(excelFile); 
// const sheetName = workbook.SheetNames[0]; 
// const sheet = workbook.Sheets[sheetName];
// const rows = xlsx.utils.sheet_to_json(sheet, { defval: null }); 

// const groupedData = {};
// rows.forEach((row)=>{
//     const country = row.Country;
//     const city = row.City;
//     if(!groupedData[country]){
//         groupedData[country] = [];
//     }
//     groupedData[country].push(city);
    
// }); 

// fs.writeFileSync("groupedData.json", JSON.stringify(groupedData, null, 2), "utf-8");




app.get("/", (req,res)=>{


    res.render("index.ejs");
})

const apiKey = process.env.API_KEY



app.post("/check", async(req,res)=>{
    
    const location=req.body.city
     try { const datum = await axios.get('https://api.weatherapi.com/v1/current.json', 
        { params: { 
            key: apiKey, q: location, 
            aqi: 'yes' // optional: exclude air quality data 
            } })
        
        const result = datum.data;
        res.render("index.ejs", { result });
        }
    
         catch (error) { 
        console.error('Error fetching weather data:', error.message); 
    }
    }
    ) 




app.listen(PORT,()=>{
    console.log(`Server is running on the port: ${PORT}`)
})