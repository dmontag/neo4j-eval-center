#!/bin/sh

for file in *.txt; do
    curl -d @$file http://console.neo4j.org/console/cypher \
    | ruby -rjson -e 'puts JSON.dump(JSON.parse(STDIN.read)["visualization"])' \
    > $file.viz
done

mv *.viz ../../viz/
