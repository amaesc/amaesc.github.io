function cambiarEstado() {

    let audio = document.getElementById("audioMision");
    console.log(audio);
    audio.play();

    let parrafo = document.getElementById("texto-mision");
    
    parrafo.innerText = "Estado: Misión ACTIVA";
    
    let tarjeta = document.querySelector(".tarjeta");
    tarjeta.style.borderColor = "red";
    tarjeta.style.boxShadow = "0 0 30px red";
    tarjeta.style.transition = "all 0.5s";
    
    parrafo.style.color = "red";
    parrafo.style.fontWeight = "bold";
}