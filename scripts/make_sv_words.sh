#!/bin/sh

set -x

RAW_WORDS_FILE=scripts/data/parole_most_freq_50k.txt
CLEAN_WORDS_FILE=scripts/data/words.txt
TSX_WORDS_FILE=src/data/words.sv.tsx

cat ${RAW_WORDS_FILE} | \
grep "^[0-9]" | \
uniq | \
grep -v "'" | \
grep -v "," | \
grep -v " " | \
grep -v ":" | \
grep -v "-" | \
grep -v "\." | \
grep -v "[[:upper:]]" \
>${CLEAN_WORDS_FILE}

echo "const words: { [key: string]: boolean } = {" >${TSX_WORDS_FILE}
gawk -v q="'" 'length($2)==5 { print q $2 q": true," }' ${CLEAN_WORDS_FILE} >>${TSX_WORDS_FILE}
echo "}" >>${TSX_WORDS_FILE}
echo "" >>${TSX_WORDS_FILE}
echo "export default words" >>${TSX_WORDS_FILE}

RAW_ANSWERS_FILE=scripts/data/parole_most_freq_10k.txt
CLEAN_ANSWERS_FILE=scripts/data/answers.txt
TSX_ANSWERS_FILE=src/data/answers.sv.tsx

cat ${RAW_ANSWERS_FILE} | \
grep "^[0-9]" | \
uniq | \
grep -v "'" | \
grep -v "," | \
grep -v " " | \
grep -v ":" | \
grep -v "-" | \
grep -v "\." | \
grep -v "[[:upper:]]" \
>${CLEAN_ANSWERS_FILE}

echo "const answers = [" >${TSX_ANSWERS_FILE}
cat ${CLEAN_ANSWERS_FILE} | gawk -v q="'" 'length($2)==5 { print q $2 q"," }' >>${TSX_ANSWERS_FILE}
echo "]" >>${TSX_ANSWERS_FILE}
echo "" >>${TSX_ANSWERS_FILE}
echo "export default answers" >>${TSX_ANSWERS_FILE}
