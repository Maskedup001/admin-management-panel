import { Component, OnInit } from '@angular/core';
import { ThemeSwitcherService } from './services/theme-switcher.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitcherComponent implements OnInit {
  currentTheme: string = this.themeService.currentTheme || 'light-theme';

  constructor(private themeService: ThemeSwitcherService) {}

  ngOnInit() {
    this.themeService.setTheme(this.currentTheme);
  }

  toggleTheme() {
    // Переключаем между светлой и темной, сохраняя состояние синей темы
    if (this.currentTheme === 'light-theme') {
      this.currentTheme = 'dark-theme';
    } else if (this.currentTheme === 'dark-theme') {
      this.currentTheme = 'light-theme';
    } else if (this.currentTheme === 'blue-theme') {
      // Если синяя тема, переключаем на темную
      this.currentTheme = 'dark-theme';
    }
    this.themeService.setTheme(this.currentTheme);
  }

  toggleBlueTheme() {
    // Переключаем синюю тему с любой текущей темы
    if (this.currentTheme === 'blue-theme') {
      // Возвращаемся к предыдущей теме (светлой)
      this.currentTheme = 'light-theme';
    } else {
      // Включаем синюю тему с любой текущей
      this.currentTheme = 'blue-theme';
    }
    this.themeService.setTheme(this.currentTheme);
  }

  // Для отображения иконок
  getMainButtonIcon(): string {
    // Показываем светлую иконку когда синяя тема активна
    return this.currentTheme === 'blue-theme' ? 'light-theme' : this.currentTheme;
  }

  isBlueThemeActive(): boolean {
    return this.currentTheme === 'blue-theme';
  }
}