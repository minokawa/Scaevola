import { INumberDict, IObjectDict } from "@app/types";

export default class DocClassifier {
  protected vocabulary: string[] = [];
  protected document_count = 0;
  protected keyphrases: string[] = [];
  protected keyphrase_tokens: IObjectDict = {};
  protected keyphrase_frequency: INumberDict = {};
  protected keyphrase_size: INumberDict = {};

  config = {};

  constructor(config: {}) {
    if (typeof config == "undefined") return;
    this.config = config;
  }

  
  to_json(prettyPrint: boolean = true) {
    const prettyPrintSpaces = prettyPrint ? 2 : 0;
    return JSON.stringify(this, null, prettyPrintSpaces);
  }

  train(text: string, label: string) {
    this.init_keyphrases(label);
    this.keyphrase_frequency[label]++;
    this.document_count++;
    const phrases = this.extract(text);
    const keyphrases = this.identify(phrases);
    this.update_keyphrase_map(keyphrases, label);
  }

  classify(text: string) {
    return this.calc_pkeyphrase(text);
  }

  private init_keyphrases(label: string) {
    if (this.keyphrases?.includes(label)) return this;
    this.keyphrase_frequency[label] = 0;
    this.keyphrase_size[label] = 0;
    this.keyphrase_tokens[label] = {};
    this.keyphrases.push(label);
    return this;
  }

  private update_keyphrase_map(keyphrases: INumberDict, label: string) {
    Object.keys(keyphrases).forEach((token) => {
      !this.vocabulary.includes(token) || this.vocabulary.push(token);
      let curr = keyphrases[token];
      let prior = this.keyphrase_tokens[label][token];
      let frq = prior ? prior + curr : curr;
      this.keyphrase_tokens[label][token] = frq;
      this.keyphrase_size[label] += frq;
    });

    return this;
  }

  private extract(text: string) {
    let tokens = text
      .replace(/[^(a-zA-ZA-Яa-я\u4e00-\u9fa50-9_)+\s]/g, " ")
      .replace(/[\u4e00-\u9fa5]/g, (word) => `${word} `)
      .split(/\s+/);
    return tokens;
  }

  private identify(tokens: string[]) {
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
  private calc_pkeyphrase(document: string) {
    const extraction = this.extract(document);
    const candidates = this.identify(extraction);

    let P = this.keyphrases
      .map((keyphrase) => {
        let { keyphrase_frequency, document_count } = { ...this };
        let PoK = Math.log(keyphrase_frequency[keyphrase] / document_count);

        Object.keys(candidates).forEach((token) => {
          const PoT = Math.log(this.calc_ptoken(token, keyphrase));
          PoK += candidates[token] * PoT;
        });

        return {
          keyphrase: keyphrase,
          score: PoK,
        };
      })
      .sort((prev, next) => next.score - prev.score);
    return P;
  }

  //Chance of token in phrase
  private calc_ptoken(token: string, keyphrase: string) {
    const keyphrase_tokens = this.keyphrase_tokens[keyphrase][token] || 0;
    const keyphrase_size = this.keyphrase_size[keyphrase];
    return (keyphrase_tokens + 1) / (keyphrase_size + this.vocabulary.length);
  }
}
