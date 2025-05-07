export default class Employee {
    // 1. Typage des propiétés
    id: number;
    name: string;
    picture: string;
    types: Array<string>;
    created?: Date;
     
    // 2. Définition des valeurs par défaut
    constructor(
     id: number,
     name: string = 'name',
     picture: string = '',
     types: Array<string> = [],
     created: Date = new Date()
    ) {
     // 3. Initialisation des propiétés
     this.id = id;
     this.name = name;
     this.picture = picture;
     this.types = types;
     this.created = created;
    }
}