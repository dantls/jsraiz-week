const movies = [
  {
    title: 'Filme XPTO',
    image: 'http://lorempixel.com/300/150',
    categories: ['001','002']
  },
  {
    title: 'Filme XXPO',
    image: 'http://lorempixel.com/300/160',
    categories: ['003','001']
  }
];

const categories = [
  {
    id: '001',
    title: 'Drama'
  },
  {
    id: '002',
    title: 'Horror'
  },
  {
    id: '003',
    title: 'thriller'
  },
  {
    id: '004',
    title: 'action'
  },
];



//Função para imprimir card
// console.log(CardComponent(movies[1]));
const CardComponent = (props) =>{
  const {image, title,categories} = props;

  return `
    <div class="card">
      <img src="${image}" alt="" class="card-img-top">
      <div class="card-body">
        <h3 class="card-title">${title}</h3>
        <p class="card-text">
          ${categories.map(catId => (
            `<a href="#" class="badge badge-secondary">${getCategory(catId)}</a>`
          )).join(' ')}
        </p>
      </div>            
    </div>
  `
}

// const getCategory = catId => {
//   return categories.find(category =>{
//     return category.id === catId;
//   })
// }
const getCategory = catId => {
  const {title} = categories.find(category =>{
    return category.id === catId;
  })
  return title
}


const CardsComponents = () => {
  return movies.map(movie =>{
    return CardComponent(movie)
  }).join('')
}

//imprime todos cards que serão colocados na tela
// console.log(CardsComponents());

//Na função acima existiu a redundância, poderia retirar a arrow function e deixar 
// somente da forma que é mostrada abaixo. Pois CardComponents ja é uma função
// então quando o map itera ele invoca a função CardComponent passando o valor do que
// ele está iterando que é o movie


// const CardsComponents = ()=>{
//   return movies.map(CardComponent).join('')
// }

//Uni as linhas do array e torna uma unica string
//console.log(moviesHTML.join(''));


//Jogo o texto para a tela
const container = document.querySelector('#cards-container');
container.innerHTML = CardsComponents();

//Capturar o envio do formulário

document.querySelector('#form-movie').addEventListener('submit', event => {
  event.preventDefault();

  const title = event.target.title.value;
  const image = event.target.image.value;
  const categories = event.target.categories.options;

  //categories retorna um HTMLOptionsCollection
  //console.log(categories);
  const selectedCategories = [...categories]
    .filter(category => category.selected === true)
    .map(option => option.value);
  
  //console.log(selectedCategories);

  movies.push({
    title,
    image,
    categories:selectedCategories
  });

  container.innerHTML = CardsComponents();
})


//Inserção de categorias

const SelectOptions = () => {
 return categories.map(category => (
   `<option value="${category.id}">${category.title}</option>`
 )).join('')
}

//console.log(SelectOptions());

document.querySelector('#categories').innerHTML = SelectOptions();