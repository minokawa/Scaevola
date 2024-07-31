
import {INumberDict, IObjectDict} from "../types";

export default class DocClassifier{
  protected vocabulary:string[]  = [];
  protected document_count = 0;
  protected keyphrases:string[] = [];
  protected keyphrase_tokens:IObjectDict= {};
  protected keyphrase_frequency:INumberDict  = {};
  protected keyphrase_size:INumberDict  = {};
  public config;

  constructor(config:{}) {
    if (typeof config == "undefined") return;
    this.config = config;
  }
  to_json(prettyPrint:boolean = true) {
    const prettyPrintSpaces = prettyPrint ? 2 : 0;
    return JSON.stringify(this, null, prettyPrintSpaces);
  }
  train(text:string, label:string) {
    this.init_keyphrases(label);
    this.keyphrase_frequency[label]++;
    this.document_count++;
    const phrases = this.extract(text);
    const keyphrases = this.identify(phrases);
    this.update_keyphrase_map(keyphrases,label);
  }

  classify(text:string) {
    return this.calc_pkeyphrase(text);
  }

  private init_keyphrases(label:string) {
    if (this.keyphrases?.includes(label)) return this;
    this.keyphrase_frequency[label] = 0;
    this.keyphrase_size[label] = 0;
    this.keyphrase_tokens[label] = {};
    this.keyphrases.push(label);
    return this;  
  }

  private update_keyphrase_map(keyphrases:INumberDict,label:string ) {
    Object.keys(keyphrases).forEach((token) => {
    
      if (!this.vocabulary.includes(token)) this.vocabulary.push(token);
      const frq_update = keyphrases[token];
      let frq_prior = this.keyphrase_tokens[label][token];

      // assume new
      let frq = frq_update;
      // if prior exists, add 
      if (frq_prior) frq = frq_prior + frq_update;
  
      this.keyphrase_tokens[label][token] = frq;
      this.keyphrase_size[label] += frq;
    });

    return this;
  }

  private extract(text:string){
     let tokens = text
      .replace(/[^(a-zA-ZA-Яa-я\u4e00-\u9fa50-9_)+\s]/g, " ")
      .replace(/[\u4e00-\u9fa5]/g, (word) => `${word} `)
      .split(/\s+/);
      return tokens;
  }

  private identify(tokens:string[]){
    const freq_map = Object.create(null);
    tokens.forEach((token) => {
      if (!freq_map[token]) {
        freq_map[token] = 1;
        return;
      } 
      freq_map[token]++;
    });
    return freq_map;
  }

  //Chance of phrase in text
  private calc_pkeyphrase(document:string) {

    const phrases = this.extract(document);
    const keyphrases = this.identify(phrases); 

    return this.keyphrases
      .map((keyphrase) => {
        let pkeyphrase = Math.log(this.keyphrase_frequency[keyphrase] / this.document_count);
       
        Object.keys(keyphrases).forEach((token) => {
          const freq = keyphrases[token];
          const ptoken = this.calc_ptoken(token, keyphrase); 
          pkeyphrase += freq * Math.log(ptoken);
        });

        return {
          keyphrase: keyphrase,
          score: pkeyphrase,
        };
      })
      .sort((prev, next) => next.score - prev.score);
  }
  
  //Chance of token in phrase
  private calc_ptoken(token:string, keyphrase:string) {
    const keyphrase_tokens = this.keyphrase_tokens[keyphrase][token] || 0;
    const keyphrase_size = this.keyphrase_size[keyphrase];
    return (keyphrase_tokens + 1) / (keyphrase_size + this.vocabulary.length);
  }

}
