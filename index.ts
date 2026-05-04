// Первый урок 

// 1.Установил git 
// 2.Создал git репозиторий 
// 3.Работал с git репозиторием 
// 4.Опубликовал проект на gitHub
// 5.Прочитал доп материалы 


// Второй урок 2
// console.log(1)


// Третий урок 3

// const age: number = 35;

// if (age < 18) {
// console.log('Доступ запрещён');
// } 
// else {
//     console.log(`Таблица умножения на ${age}:`);
//     for (let i = 1; i <= 10; i++) {
//         console.log(`${age} × ${i} = ${age * i}`);
//     }
// }


// Четвертый урок 4

// // Функция возвращает число или строку (тип number или string)
// function calculate2(a: number, b: number, operator: string): number | string {
// 	if (operator === "+") return a + b;
// 	if (operator === "-") return a - b;
// 	if (operator === "*") return a * b;
// 	if (operator === "/") return a / b;
// 	// Если оператор не распознан, возвращается строка с ошибкой
// 	return "Ошибка: неизвестный оператор"
// }

// //Вывод  
// console.log("Результат:", calculate2(10, 5, "+"));
// console.log("Результат:", calculate2(10, 5, "-"));
// console.log("Результат:", calculate2(10, 5, "*"));
// console.log("Результат:", calculate2(10, 5, "/"));
// // Пример, если оператор не распознан (выведет строку с ошибкой)
// console.log("Результат:", calculate2(10, 5, "$wd"));


// // Пятый урок 5

// // Тип Product
// type Product = {
// 	name: string;
// 	price: number;
// 	inStock: boolean;
// }

// // Массив товаров 
// const products: Product[] = [
// 	{name:"Телефон", price:500, inStock:true},
// 	{name:"Ноутбук", price:1000, inStock:false},
// 	{name:"Наушники", price:100, inStock:true},
// 	{name:"Мышь", price:50, inStock:true},
// 	{name:"Клавиатура", price:80, inStock:false},
// ]

// //Только товары в наличии(на складе)
// const A_Products = products.filter(product => product.inStock);

// // Массив цен этих товаров.
// const A_Prices = A_Products.map(product => product.price);

// // Общая сумма товаров в наличии
// let total = 0;
// for(let i = 0; i < A_Products.length; i++) {
// 		total += A_Products[i].price;
// }

// // Сортировка товаров в наличии по цене (от дешёвых к дорогим)
// const Sorted_Products = [...A_Products].sort((a,b) => a.price - b.price);

// // Вывод
// console.log("Товары в наличии:", A_Products);
// console.log("Цены товаров в наличии:", A_Prices);
// console.log("Общая сумма:", total);
// console.log("Отсортированные товары:", Sorted_Products)


// Урок 6

// Описание как должны выглядеть данные о посте с сервера
interface Post {
  userId: number;  
  id: number;      
  title: string;   
  body: string;    
}

// Главная функция 
async function showUserId() {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await data.json();
  
  // Массив
  const result: number[] = [];
  
  // Перебор всех постов 
  for (let post of posts) {
    let exists = false; 
    
    // Проверка всех ID которые уже есть в результате
    for (let id of result) {
      if (id === post.userId) {
        exists = true;
        break; 
      }
    }
    
    // Если такого ID еще нет в результате то добавляем
    if (!exists) {
      result.push(post.userId);
    }
  }
  
  // Сортировка ID по возрастанию
  result.sort((a, b) => a - b);
  
  console.log('Список всех userId:');
  for (let id of result) {
    console.log(id);
  }
}

showUserId();
