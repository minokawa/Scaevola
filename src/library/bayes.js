"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var DocClassifier = /** @class */ (function () {
    function DocClassifier(config) {
        this.vocabulary = [];
        this.document_count = 0;
        this.keyphrases = [];
        this.keyphrase_tokens = {};
        this.keyphrase_frequency = {};
        this.keyphrase_size = {};
        this.config = {};
        if (typeof config == "undefined")
            return;
        this.config = config;
    }
    DocClassifier.prototype.to_json = function (prettyPrint) {
        if (prettyPrint === void 0) { prettyPrint = true; }
        var prettyPrintSpaces = prettyPrint ? 2 : 0;
        return JSON.stringify(this, null, prettyPrintSpaces);
    };
    DocClassifier.prototype.train = function (text, label) {
        this.init_keyphrases(label);
        this.keyphrase_frequency[label]++;
        this.document_count++;
        var phrases = this.extract(text);
        var keyphrases = this.identify(phrases);
        this.update_keyphrase_map(keyphrases, label);
    };
    DocClassifier.prototype.classify = function (text) {
        return this.calc_pkeyphrase(text);
    };
    DocClassifier.prototype.init_keyphrases = function (label) {
        var _a;
        if ((_a = this.keyphrases) === null || _a === void 0 ? void 0 : _a.includes(label))
            return this;
        this.keyphrase_frequency[label] = 0;
        this.keyphrase_size[label] = 0;
        this.keyphrase_tokens[label] = {};
        this.keyphrases.push(label);
        return this;
    };
    DocClassifier.prototype.update_keyphrase_map = function (keyphrases, label) {
        var _this = this;
        Object.keys(keyphrases).forEach(function (token) {
            !_this.vocabulary.includes(token) || _this.vocabulary.push(token);
            var curr = keyphrases[token];
            var prior = _this.keyphrase_tokens[label][token];
            var frq = prior ? prior + curr : curr;
            _this.keyphrase_tokens[label][token] = frq;
            _this.keyphrase_size[label] += frq;
        });
        return this;
    };
    DocClassifier.prototype.extract = function (text) {
        var tokens = text
            .replace(/[^(a-zA-ZA-Яa-я\u4e00-\u9fa50-9_)+\s]/g, " ")
            .replace(/[\u4e00-\u9fa5]/g, function (word) { return "".concat(word, " "); })
            .split(/\s+/);
        return tokens;
    };
    DocClassifier.prototype.identify = function (tokens) {
        var freq_map = Object.create(null);
        tokens.forEach(function (token) {
            if (!freq_map[token]) {
                freq_map[token] = 1;
                return;
            }
            freq_map[token]++;
        });
        return freq_map;
    };
    //Chance of phrase in text
    DocClassifier.prototype.calc_pkeyphrase = function (document) {
        var _this = this;
        var extraction = this.extract(document);
        var candidates = this.identify(extraction);
        var P = this.keyphrases
            .map(function (keyphrase) {
            var _a = __assign({}, _this), keyphrase_frequency = _a.keyphrase_frequency, document_count = _a.document_count;
            var PoK = Math.log(keyphrase_frequency[keyphrase] / document_count);
            Object.keys(candidates).forEach(function (token) {
                var PoT = Math.log(_this.calc_ptoken(token, keyphrase));
                PoK += candidates[token] * PoT;
            });
            return {
                keyphrase: keyphrase,
                score: PoK,
            };
        })
            .sort(function (prev, next) { return next.score - prev.score; });
        return P;
    };
    //Chance of token in phrase
    DocClassifier.prototype.calc_ptoken = function (token, keyphrase) {
        var keyphrase_tokens = this.keyphrase_tokens[keyphrase][token] || 0;
        var keyphrase_size = this.keyphrase_size[keyphrase];
        return (keyphrase_tokens + 1) / (keyphrase_size + this.vocabulary.length);
    };
    return DocClassifier;
}());
exports.default = DocClassifier;
