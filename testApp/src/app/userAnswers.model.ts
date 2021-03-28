
export class User{
    constructor(public answers:UserAnswers[]){}
}


export class UserAnswers{
    constructor(public questionId:number, public answer:number){}
}