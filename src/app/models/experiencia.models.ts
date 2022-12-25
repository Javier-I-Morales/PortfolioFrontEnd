

export class ExperienciaModel{

    constructor
    (
        public id: number,
        public empresa: string,
        public puesto:string,
        public fechainicio: Date,
        public fechafin: Date,
        public tarea: string,
        public numeroimagen:string
    ){}
}