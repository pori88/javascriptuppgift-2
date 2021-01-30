const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');


let todos = [];

const fetchTodos = () => {
  fetch('http://jsonplaceholder.typicode.com/photos?_start=0&_limit=5')
  .then(res => res.json())
  .then(data => {
    todos = data;
    listTodos();
  })
}
fetchTodos();


const newTodo = (todo) => {

    let card = document.createElement('div');
    card.classList.add('card', 'p-3', 'my-3', 'todo');
  
    let innerCard = document.createElement('div');
    innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center');
  
    let title = document.createElement('h3');
    title.classList.add('title');
    title.innerText = todo.title;
  
    let button = document.createElement('button');
    button.classList.add('btn', 'btn-danger');
    button.innerText = 'X';
    button.addEventListener('click', () => console.log(todo.id));
  
    innerCard.appendChild(title);
    innerCard.appendChild(button);
    card.appendChild(innerCard);
    output.appendChild(card);
  }
  
  
  const listTodos = () => {
    output.innerHTML = '';
    todos.forEach(todo => {
      newTodo(todo);
    })
  }
  
  
  const createTodo = (title) => {
  
    fetch('https://jsonplaceholder.typicode.com/todos',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        title,
        completed: false
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      todos.unshift(data);
      listTodos();
    })
  
  }
  
  form.addEventListener('submit', e => {
    e.preventDefault();

    if (input.value.length == 0) {
        alert('du kan inte lägga till en tom todo!')
        return false;

    } 
    createTodo(input.value);
    input.value = '';
  })