import myBakery from "./bakery.png";

export default function loadHome(){
const contentDiv = document.querySelector('#content');
const img = document.createElement('img');
const p= document.createElement('p');
const p1 = document.createElement('p');
const p2 = document.createElement('p');
p.classList.add("home-text");
p1.classList.add("home-text");
p2.classList.add("home-text");

p.textContent="Best Parisian Pâtissery";
p1.textContent="Made with love since 1989";
p2.textContent="Visit us or order online!";

img.src=myBakery;
img.alt="Bakery";
img.classList.add('bakeryImg');
contentDiv.append(p,p1,p2,img)



}