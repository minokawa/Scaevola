import DocClassifier from "../library/bayes";
import * as fs from 'fs';
import { getLogger, initLogger } from "../report/logger";
import { getConfig } from "../conf";
const args = getConfig();

let classifier = new DocClassifier({});
classifier.train("What respondent did to complainant was plain and simple trickery; his transgression would have been mitigated had he simply acknowledged, at the first instance, that he pocketed the money given to her by complainant and made amends by returning the same; what makes his act more deplorable is that he took advantage of complainant's trust in him and actively and knowingly deceived the latter by making it appear that he bought a property in her name when, in fact, he did not; to make matters worse, he did not content himself with the supposed purchase price agreed upon and even had the gall to ask for additional amounts to allegedly defray the expenses for taxes and other processing fees; for a number of times, respondent promised to indemnify complainant, but he never did; respondent is guilty of violating the provisions of Art. 19 of the Civil Code. (Yamon-Leach vs. Atty. Astorga, A.C. No. 5987, Aug. 28, 2019)", "ABUSE OF RIGHTS");
classifier.train("The Court holds that Abelardo's killing was attended by abuse of superior strength; this qualifying circumstance is present whenever there is a notorious inequality of forces between the victim and the aggressor, assuming a situation of superiority of strength notoriously advantageous for the aggressor selected or taken advantage of by him in the commission of the crime; People v. Casillar and People v. Garcia, cited. (People vs. Angeles, G.R. 224289, Aug. 14, 2019)","ABUSE OF SUPERIOR STRENGTH");
classifier.train("Apart from the perspective of academic freedom, the reasonable supervision and regulation clause is also to be viewed together with the right to education; the 1987 Constitution speaks quite elaborately on the right to education; the normative elements of the general right to education under Section 1, Article XIV, are: (1) to protect and promote quality education; and (2) to take appropriate steps towards making such quality education accessible; quality education is statutorily defined as the appropriateness, relevance and excellence of the education given to meet the needs and aspirations of the individual and society.(Pimentel vs. Legal Education Board, G.R. 230642, Sept. 10, 2019)", "ACADEMIC FREEDOM");
classifier.train("Accion interdictal is a summary action that seeks the recovery of physical possession where the dispossession has not lasted for more than one year, and is to be exclusively brought in the proper inferior court; the issue involved is material possession or possession de facto. (Martinez vs. Heirs of Remberto F. Lim, G.R. 234655, Sept. 11, 2019)", "ACCION INTERDICTAL");
classifier.train("Accion publiciana is the second possessory action; it is a plenary action to recover the right of possession, and the issue is which party has the better right of possession (possession de jure); it can be filed when the dispossession lasted for more than one year; it is also used to refer to an ejectment suit where the cause of dispossession is not among the grounds for forcible entry and unlawful detainer, or when possession has been lost for more than one year and the action can no longer be maintained under Rule 70 of the Rules of Court; the objective of the plaintiff in accion publiciana is to recover possession only, not ownership. (Martinez vs. Heirs of Remberto F. Lim, G.R. 234655, Sept. 11, 2019)", "ACCION PUBLICIANA");
classifier.train("Art. 555 of the new Civil Code recognizes that a possessor may lose his possession de facto by the possession of another when the latter's possession has lasted longer than one year; however, his real right of possession is not lost until after the lapse of 10 years; this same Art. 555 thus recognizes the registered owner's remedy to institute an accion publiciana within the said 10-year period. (Heirs of Alfredo Cullado vs. Gutierrez, G.R. 212938, July 30, 2019)","ACCION PUBLICIANA");
classifier.train("To sustain a claim liability under quasi-delict, the following requisites must concur: (a) damages suffered by the plaintiff; (b) fault or negligence of the defendant, or some other person for whose acts he must respond; and (c) the connection of cause and effect between the fault or negligence of the defendant and the damages incurred by the plaintiff. (Sps. Dalen, Sr. vs. Mitsui O.S.K. Lines, G.R. 194403, July 24, 2019)","QUASI-DELICTS");
classifier.train("In an action for quieting of title, the competent court is tasked to determine the respective rights of the complainant and other claimants, not only to place things in their proper place, to make the one who has no rights to said immovable respect and not disturb the other, but also for the benefit of both, so that he who has the right would see every cloud of doubt over the property dissipated, and he could afterwards without fear introduce the improvements he may desire, to use, and even to abuse the property as he deems best. (Sps. Yu vs. Topacio, Jr., G.R. 216024, Sept. 18, 2019)", "QUASI-DELICTS");
classifier.train("It must be stressed that in robbery with homicide, the offender's original intent must be the commission of robbery; the killing is merely incidental and subsidiary; however, when the offender's original criminal design does not clearly comprehend robbery, but robbery follows the homicide as an afterthought or as a minor incident of the homicide, the criminal acts should be viewed as constitutive of two offenses and not of a single complex offense. (People vs. Palema, G.R. 228000, July 10, 2019)", "ROBBERY WITH HOMICIDE");

initLogger(args);
async function test() {

    const j = classifier.to_json();
    fs.writeFile('classifier.json', j, (err) => {
    if (err) throw err;
        console.log('Classifier state saved!');
    });

    const test_text = 'criminal design does not clearly comprehend robbery, has not lasted for more than one year';
    const c = classifier.classify(test_text);

    getLogger().info(c);
}

test();
