// Первый урок 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Главная функция 
function showUserId() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = yield data.json();
        // Массив
        const result = [];
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
    });
}
showUserId();
