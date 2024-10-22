import { InputJsonValue } from "@prisma/client/runtime/library";

export default class CreateProblemDto {


    constructor(public title: string,
        public description: string,
        public difficulty: string,
        public functionName: string,
        public parametersNames: InputJsonValue
    ) { };


} 