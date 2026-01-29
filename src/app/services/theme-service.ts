import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Signal שמחזיק את המצב הנוכחי - טוען מה-localStorage אם קיים
  private _darkMode = signal<boolean>(localStorage.getItem('theme') === 'dark');
  
  readonly darkMode = this._darkMode.asReadonly();

  constructor() {
    // Effect של אנגולר - רץ אוטומטית כל פעם שה-Signal משתנה
    effect(() => {
      const mode = this._darkMode() ? 'dark' : 'light';
      localStorage.setItem('theme', mode);
      this.applyTheme(mode);
    });
  }

  toggleTheme() {
    this._darkMode.update(val => !val);
  }

  private applyTheme(mode: string) {
    if (mode === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}