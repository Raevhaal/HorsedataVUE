



import Papa from "papaparse";
import { Move } from "./types";

export async function getFrameData(){
    let responseData: Response;
    responseData = await downloadFrameData();

    console.log(responseData);
}


//Downloads framedata from google sheets
function downloadFrameData(){
    //Variables
    const csvHeaders: string[] = ["Character", "Move category", "Move Name", "Stance", "Command", "Hit level", "Impact", "Damage", "Block", "Hit", "Counter Hit", "Guard Burst", "Notes"];
    const frameDataUrl: string = "https://docs.google.com/spreadsheets/d/1R3I_LXfqhvFjlHTuj-wSWwwqYmlUf299a3VY9pVyGEw/export?exportFormat=tsv";
    await new Promise( async (resolve, reject) => {
        Papa.parse(frameDataUrl, {
            download: true,
            header: true,
            delimiter: "\t",
            transformHeader: function(_,index){
                //Applies headers from Fheaders
                return csvHeaders[index];
            },
            error: (error) => {
                reject(error);
            },
            complete: (results) => {
                results.data.splice(0,3);
                resolve(results.data);
            },
        });
    });

    console.log("frame data downloaded!")
    console.log()
}