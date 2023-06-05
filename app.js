let numpad = Array.from(document.querySelectorAll(".btn"))
let val = document.getElementById("valeur")
numpad.map( button =>{
  button.addEventListener('click', (e) => {
    switch(e.target.value){
      case 'Supp':
        if(val){
          val.innerHTML = val.innerHTML.slice(0,-1)
        }
        break
      default:
        val.innerHTML += e.target.value
    }

  })
})

let prix = 2.9

const valider = document.getElementById("valid")



class Produit{
  constructor(nom,prix,image){
    this.nom = nom
    this.prix = prix
    this.image = image
  }
}

const img = document.getElementById("images")
const nomProduit = document.getElementById("nomProduit")
let prixProduit1 = ""
const text = document.getElementById("plusMoins")
const point =  document.getElementById("point")
let pm = document.getElementById("plusMoins")
let score = 0

const poire = new Produit('Poire',2.49, "./images/produits/poire.jpg")
const avocat = new Produit('Avocat',0.89, "./images/produits/avocat.jpg")
const citron = new Produit('Citron',0.69, "./images/produits/citron.jpg")
const mandarine = new Produit('Mandarine',1.99, "./images/produits/orange.jpg")
const raisin = new Produit('Raisin',1.99, "./images/produits/raisin.jpg")
const tomate = new Produit('Tomate',2.99, "./images/produits/tomate.jpg")

const allProduct = []

allProduct.push(poire)
allProduct.push(avocat)
allProduct.push(citron)
allProduct.push(mandarine)
allProduct.push(raisin)
allProduct.push(tomate)

len = allProduct.length
let generate = 0
let done  = []

const pointsFinal = document.getElementById("pointsFinal")

function game(){
  generate = Math.floor(Math.random() * len);
  if(done.includes(generate)){
    if(done.length === allProduct.length){
      pointsFinal.innerHTML = `Bravo, tu as deviné ${score} Produits`
      pointsFinal.style.display = "block"
      setTimeout(()=>{
        pointsFinal.style.height = "100%"
        pointsFinal.style.top = "0"
        pointsFinal.style.paddingTop = "300px"
      },1000)
      
      setTimeout(()=>{
        window.location.href = "accueil.html";
        pointsFinal.style.display = 'none'
      }, 8000)
      
    }
    game()
  }
  else{
    leproduit = allProduct[generate]
    nomProduit.innerHTML = leproduit.nom
    img.src = leproduit.image
    prixProduit1 = leproduit.prix
    done.push(generate)
  }

}
game()

function plusmoins(){
  if(parseFloat(val.innerHTML) > parseFloat(prixProduit1)){
    pm.style.display = "block"
    pm.innerHTML = "MOINS !"
    pm.animate([
      { backgroundColor: '#007F66' },
      { backgroundColor: '#00CCA4' }
    ], {
      duration: 1000,
      iterations: Infinity
    });
  }
  else if (parseFloat(val.innerHTML) < parseFloat(prixProduit1)) {
    pm.style.display = "block"
    pm.innerHTML = "PLUS !"
    pm.animate([
      { backgroundColor: '#D94169' },
      { backgroundColor: '#FF9ACB' }
    ], {
      duration: 1500,
      iterations: Infinity
    });
  }
}

let timer = document.getElementById("timer")
let timerdown = 30

timer.innerHTML = timerdown

function down(){
  if(timerdown > 0){
    timerdown--
    timer.innerHTML = timerdown
    if (timerdown <= 20 && timerdown > 10) {
      timer.style.backgroundColor = "orange"
    }
    else if (timerdown <= 10) {
      timer.style.backgroundColor = "red"
    }
    else{
      timer.style.backgroundColor = "rgb(61, 186, 61);"
    }
  }
  if(timerdown === 0 || timerdown < 0){
    game()
    pm.style.display = "none"
    timerdown = 31
  }
}
setInterval(down, 1000)
valider.addEventListener("click", function(){
  console.log(parseFloat(val.innerHTML))
  plusmoins()
  if(parseFloat(val.innerHTML) === parseFloat(prixProduit1)){
    if(done.length === allProduct.length){   
      score = score + 1
      point.innerHTML = score + " points"
    }
    game()
    pm.style.display = "none"
    val.innerHTML = ""
    score = score + 1
    timerdown = 31
    point.innerHTML = score + " points"

  }
})
