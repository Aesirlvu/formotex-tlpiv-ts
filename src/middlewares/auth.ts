export class Authorization {
  // TODO: implementar la logica de autorización
  static checkRole(role: string) {}
  static checkPermissions(permissions: string[]) {}

  // ? metodos para verificar roles específicos
  // ? estos metodos si podrian incluir req, res, next
  // ? para usarlos como middlewares en las rutas
  static isUser() {}
  static isAdmin() {}

  // ? y para verificar si está autenticado
  static isAuthenticated() {}
}
