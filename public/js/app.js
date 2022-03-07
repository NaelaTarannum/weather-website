

console.log("CLient side javascript is loaded")
fetch("https://puzzle.mead.io/puzzle").then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const paragraph1 = document.querySelector('#message1');
const paragraph2 = document.querySelector('#message2');

paragraph1.textContent = '';
paragraph2.textContent = '';
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const address = search.value;
    paragraph1.textContent = "loading...";
    fetch("http://localhost:4000/weather?address="+address).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           paragraph1.textContent = data.error;
           paragraph2.textContent = '';
        }
        else{
            paragraph2.textContent = "Location: "+data.address;
            paragraph1.textContent = "Temperature: "+data.temperature;
        }
        // console.log(data);
    })
})

})