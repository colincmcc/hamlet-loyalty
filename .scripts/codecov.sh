#!/bin/bash

REPORT=$(find code/target/debug -maxdepth 1 -name '<hamlet-music-msa-*' -a ! -name '*.d')

for file in $REPORT; do
    mkdir -p "/hamlet-music-msa/code/target/cov/$(basename $file)"
    kcov --exclude-pattern=/.cargo,/usr/lib --verify "/hamlet-music-msa/code/target/cov/$(basename $file)" "$file"
done

wget -O - -q "https://codecov.io/bash" > .codecov
chmod +x .codecov
./.codecov # -t $CODECOV_TOKEN
echo "Uploaded code coverage"