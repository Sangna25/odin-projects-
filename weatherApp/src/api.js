export async function fetchData(inputCity){
    try{
        
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputCity}?key=4RG2QTQPJ97U26XA7M76592NN`);
        if(!response.ok){   
            throw new Error("Oops! Cant find the city");
        } 
        const data = await response.json();
        return data
}catch(error){
    console.error("Oops!");
}}