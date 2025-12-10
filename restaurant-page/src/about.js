export default function loadAbout(){
    const contentDiv=document.querySelector('#content');
    const heading=document.createElement('h2');
    heading.textContent="Bienvenue to S in Paris!";
    heading.classList.add('about-head');

    const info = document.createElement('p');
    info.textContent="We bring the authentic taste of Paris straight to your table. From buttery croissants to delicate macarons, each creation is handcrafted with love, the finest ingredients, and a touch of French tradition.";

    info.classList.add('abt-inf')
   const contactInfo=["Address : 123 Rue de Pâtisserie, Paris, France","Contact : +33 1 23 45 67 89","Mail : contact@gmail.com" ];
   
const contact = document.createElement('ul');
contactInfo.forEach(items =>{
    const li =document.createElement('li');
    li.textContent=items;
    contact.append(li);

});
contact.classList.add('abt-contact')
contentDiv.append(heading,info,contact);
    

}