
export default function loadMenu(){
    const contentDiv = document.querySelector('#content');
    
    const menuItems = [
        {
        name:"Croissant",
        ingredients:"Puff pastry,butter,egg wash",
         },
        {
            name: "Pain Au Chocolat",
            ingredients: "Puff pastry, dark chocolate batons, butter",
        },
        {
            name: "Macaron",
            ingredients: "Almond flour, egg whites, sugar, ganache or buttercream filling",
        },
        {
            name: "Éclair Au Chocolat",
            ingredients: "Choux pastry, chocolate pastry cream, chocolate glaze",
        },
        {
            name: "Paris-Brest",
            ingredients: "Choux pastry ring, praline mousseline cream, toasted almonds",
        },
        {
            name: "Mille-Feuille",
            ingredients: "Three layers of puff pastry, two layers of vanilla pastry cream, fondant icing",
        },
        {
            name: "Tarte Au Citron Meringuée",
            ingredients: "Sweet tart shell, lemon curd, fluffy Italian meringue",
        },
        {
            name: "Opéra Cake",
            ingredients: "Almond sponge cake, coffee syrup, coffee buttercream, chocolate ganache",
        },
        {
            name: "Madeleine",
            ingredients: "Sponge cake batter, lemon zest, butter (shell-shaped)",
        },
        {
            name: "Religieuse",
            ingredients: "Two stacked choux buns (one large, one small), chocolate or coffee pastry cream, fondant glaze",
        }

]
 const container = document.createElement('div');
 container.classList.add('menu-container');
 menuItems.forEach((item)=>{
    const menuCard= document.createElement('div');
    menuCard.classList.add("menu-card");
    const title= document.createElement('h2');
    title.textContent=item.name;
    const ingredient=document.createElement('p');
    ingredient.textContent=item.ingredients;
    menuCard.append(title,ingredient);
    container.append(menuCard);

  


 })
 contentDiv.append(container);
}
