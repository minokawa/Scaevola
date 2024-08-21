import DocClassifier from "@library/bayes";
import * as fs from "fs";
import { getConfig } from "@app/conf";
import { fruitdata, table_data, chart_data, learn_data } from "@app/testdata";
import { getLogger, initLogger } from "@report/logger";
import {Tabler, Brancher, Charter} from "@report/visuals";
import {drawSquare, drawGrid, gridMember} from '@report/grid/visuals';


console.log(Brancher('*root\r\n**level1_1\r\n**level1_2\r\n**level1_3'));

const table = new Tabler(table_data);
console.log(table.display());


let charter = new Charter(chart_data).sort("ASC", "value");
console.log(charter.chart({}));

let charter2 = new Charter(fruitdata).sort("ASC", "value");
console.log(charter2.chart({ pattern: true, spaced: true, hideLabels: true }));

console.log(drawGrid([
  gridMember(0, 0, drawSquare('tb2')),
  gridMember(1, 0, drawSquare('A2')),
  gridMember(0, 1, drawSquare('A3')),
  gridMember(1, 1, drawSquare('A4')),
]))

let classifier = new DocClassifier({});

for (let key in learn_data) {
  classifier.train(learn_data[key][0],learn_data[key][1])
}

const logger_args = getConfig();
initLogger(logger_args);

async function lexcheck() {
  const j = classifier.to_json();
  fs.writeFile("classifier.json", j, (err) => {
    if (err) throw err;
    console.log("Classifier state saved!");
  });

  const test_text = "'From the academic freedom perspective'";
  const c = classifier.classify(test_text);
  console.log("\nTest: ",test_text);
  console.log('Result: ',c);
  getLogger().info(c);
}

lexcheck();