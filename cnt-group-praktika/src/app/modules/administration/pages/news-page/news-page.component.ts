import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/@theme/components/menu/models/news.model'; 
import { NewsService } from 'src/app/@theme/components/menu/services/news.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {
  news: News[] = [];
  loading: boolean = true;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.loading = true;
    setTimeout(() => {
      this.news = this.newsService.getAllNews();
      this.loading = false;
    }, 500);
  }

  trackByNewsId(index: number, item: News): number {
    return item.id;
  }
}