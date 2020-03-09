declare namespace __esri {
  interface ErrorConstructor {
    new (name: string, message?: string, details?: any): Error;
  }
}
