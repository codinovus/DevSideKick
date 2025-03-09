export class LoremIpsumResponseDTO {
    genratedText: string;

    constructor(genratedText : string){
        this.genratedText = genratedText;
    }
}