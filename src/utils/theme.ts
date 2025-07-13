// 主题类型定义
export type Theme = 'light' | 'dark';

// 主题管理类
class ThemeManager {
  private static instance: ThemeManager;
  private theme: Theme;

  private constructor() {
    // 初始化主题，优先从localStorage获取，否则使用默认主题
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    this.theme = savedTheme || 'light';
    this.applyTheme();
  }

  // 单例模式获取实例
  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  // 获取当前主题
  public getCurrentTheme(): Theme {
    return this.theme;
  }

  // 切换主题
  public toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
    this.notifyListeners();
  }

  // 应用主题
  private applyTheme(): void {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(this.theme);
  }

  // 主题变化监听器
  private listeners: Array<(theme: Theme) => void> = [];

  // 添加监听器
  public addListener(listener: (theme: Theme) => void): void {
    this.listeners.push(listener);
  }

  // 移除监听器
  public removeListener(listener: (theme: Theme) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  // 通知所有监听器
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.theme));
  }
}

// 导出实例
export const themeManager = ThemeManager.getInstance();