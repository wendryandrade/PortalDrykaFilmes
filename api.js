const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGNlYWU0ZWZlNTBkZDkyZTFlYjAzYzI4ZWI1OWZjOCIsInN1YiI6IjVmYzg2N2Q5YjAwNDBhMDA0MjI0YTg0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h6g7AwVRva20Vep2RgzQR10l0vE1l5CLD44DHnBmh-Q";
const API_BASE_URL = "https://api.themoviedb.org/3/";

export const apiGet = async(url) => {
    
    try{
        const finalUrl = API_BASE_URL + url;

        const responsePromiss = await fetch(finalUrl, {
            method: "GET",
            headers: getHeaders()
        });
        const response = await responsePromiss.json();
        return response;
    } 
    
    catch(error){
        return null;
    }
}

const getHeaders = () => {
    const headers = new Headers();
    headers.append("Authorization", "Bearer "+ API_TOKEN);
    headers.append("Content-Type", "application/json");
    return headers;
}