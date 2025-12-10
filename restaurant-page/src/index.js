import loadHome from "./home";
import loadMenu from "./menu";
import loadAbout from "./about";
import "./styles.css";


function clearContent(){
    const contentDiv=document.querySelector('#content');
    contentDiv.innerHTML="";
}

const menuBtn = document.querySelector('#menuBtn');
const homeBtn = document.querySelector('#homeBtn');
const aboutBtn= document.querySelector('#aboutBtn');

menuBtn.addEventListener('click',()=>{
    clearContent();
    loadMenu();
});

homeBtn.addEventListener('click',()=>{
    clearContent();
    loadHome();
});

aboutBtn.addEventListener('click',()=>{
    clearContent();
    loadAbout();
})