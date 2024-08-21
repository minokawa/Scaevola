A collection of commonly used text analysis tools. This is just a sembreak kata, not for production.

### Kata
- Lex Bayes: In Progress
- Kaugnay na Doktrina
- Kaugnay na Batas 
- Kaugnay na Kasong Korte Suprema 
- LaTeX Generator(Digests, Legalforms)

### App
- Libre at Malayang Palabatasan (LAMP)
```
# npm run tsx         

> scriptura@1.0.0 tsx
> tsx src/lexcheck/index.ts

root
├─ level1_1
├─ level1_2
└─ level1_3

Fig 2.0
title        type    number    promulgation
----------  ------  --------  --------------
Lorem Act    RA      323       1990
Ipsu Act     RA      41        2021
Dolor Act    RA      23        2012
Ismet Act    RA      1323      2020


 8 │███ 3
 9 │███ 3
 5 │████ 4
11 │████ 4
 1 │█████ 5
 6 │█████ 5
10 │██████ 6
 2 │███████ 7
 3 │████████ 8
 4 │██████████ 10
12 │██████████ 10
 7 │████████████ 12
   └───────────────

 │███ 3
 │
 │▓▓▓ 3
 │
 │████ 4
 │
 │▓▓▓▓ 4
 │
 │█████ 5
 │
 │▓▓▓▓▓ 5
 │
 │██████ 6
 │
 │▓▓▓▓▓▓▓ 7
 │
 │████████ 8
 │
 │▓▓▓▓▓▓▓▓▓▓ 10
 │
 │██████████ 10
 │
 │▓▓▓▓▓▓▓▓▓▓▓▓ 12
 └───────────────
┌    ┐┌    ┐
 tb2  A2 
└    ┘└    ┘
┌    ┐┌    ┐
 A3  A4 
└    ┘└    ┘

Test:  'From the academic freedom perspective'
Result:  [
  { keyphrase: 'ACCION INTERDICTAL', score: -28.893104703070666 },
  { keyphrase: 'ACADEMIC FREEDOM', score: -30.159167008996466 },
  {
    keyphrase: 'ABUSE OF SUPERIOR STRENGTH',
    score: -30.51009886720595
  },
  { keyphrase: 'ROBBERY WITH HOMICIDE', score: -30.931884254576183 },
  { keyphrase: 'ACCION PUBLICIANA', score: -33.50384449710197 },
  { keyphrase: 'ABUSE OF RIGHTS', score: -35.30307315532257 },
  { keyphrase: 'QUASI-DELICTS', score: -35.66869533886296 }
]
Classifier state saved!
```