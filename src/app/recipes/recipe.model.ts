export class Recipe {

    // Property names which will be used for string interpolation, data binding etc.
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(name:string, desc: string, imagePath: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }
}