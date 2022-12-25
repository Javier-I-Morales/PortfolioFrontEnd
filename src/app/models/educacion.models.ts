

export class EducacionModel{

    constructor
    (
        public id: number,
        public instituto: string,
        public fechainicio: Date,
        public fechafin: Date,
        public titulo: string,
        public numeroimagen:string
    ){}
}