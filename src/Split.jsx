import Split from "split-grid";

export class split {
  static instance = null;

  constructor(config) {
    // Si ya existe una instancia, devolver esa instancia
    if (split.instance) {
      return split.instance;
    }
    // Si no existe ninguna instancia, crear una nueva y asignarla a la propiedad 'instance'
    this.instance = Split(config);
    split.instance = this;
  }

  destroySplit() {
    // Llamar al método 'destroy' en la instancia de 'Split' y luego resetear la instancia singleton
    this.instance.destroy(true);
    split.instance = null;
  }

  updateConfiguration(config) {
    // Opcionalmente, se podría agregar un método para actualizar la configuración,
    // destruyendo la instancia anterior y creando una nueva con la nueva configuración.
    this.instance.destroy(true);
    this.instance = Split(config);
  }
}
