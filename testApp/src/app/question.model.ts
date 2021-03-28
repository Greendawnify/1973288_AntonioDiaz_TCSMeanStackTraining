export class Question{
    constructor(
        public id:number, 
        public title:string, 
        public choices:string[], 
        public answer:string,
        public answerValue:number
        ){}
}