import { Injectable } from '@angular/core';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private news: News[] = [
    {
      id: 1,
      title: 'Запуск нового проекта',
      description: 'Мы рады сообщить о запуске нового инновационного проекта, который изменит подход к разработке программного обеспечения.',
      date: new Date(2024, 10, 15) // 15 ноября 2024
    },
    {
      id: 2,
      title: 'Обновление системы',
      description: 'Вышло крупное обновление платформы с новыми функциями и улучшениями производительности.',
      date: new Date(2024, 10, 10) // 10 ноября 2024
    },
    {
      id: 3,
      title: 'Технические работы',
      description: 'Запланированы технические работы на серверах. Система будет недоступна с 02:00 до 04:00.',
      date: new Date(2024, 10, 5) // 5 ноября 2024
    },
    {
      id: 4,
      title: 'Новые возможности',
      description: 'Добавлены новые инструменты для анализа данных и улучшен пользовательский интерфейс.',
      date: new Date(2024, 9, 28) // 28 октября 2024
    },
    {
      id: 5,
      title: 'Партнерство с ведущей компанией',
      description: 'Мы заключили стратегическое партнерство с одной из ведущих IT-компаний на рынке.',
      date: new Date(2024, 9, 20) // 20 октября 2024
    }
  ];

  constructor() { }

  getAllNews(): News[] {
    return this.news;
  }

  getNewsById(id: number): News | undefined {
    return this.news.find(item => item.id === id);
  }

  addNews(news: Omit<News, 'id'>): void {
    const newId = Math.max(...this.news.map(item => item.id)) + 1;
    this.news.push({ ...news, id: newId });
  }

  updateNews(id: number, updatedNews: Partial<News>): void {
    const index = this.news.findIndex(item => item.id === id);
    if (index !== -1) {
      this.news[index] = { ...this.news[index], ...updatedNews };
    }
  }

  deleteNews(id: number): void {
    this.news = this.news.filter(item => item.id !== id);
  }
}