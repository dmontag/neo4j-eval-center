#!/bin/sh

rm *.compiled *.viz

for base in *.txt; do

    curl -d @$base http://console.neo4j.org/console/cypher \
    | ruby -rjson -e 'puts JSON.dump(JSON.parse(STDIN.read)["visualization"])' \
    > $base.viz

    for query in `ls $base.frag*`; do

        cat $base > $query.compiled
        echo " WITH count(*) AS __ " >> $query.compiled
        cat $query >> $query.compiled

        curl -d @$query.compiled http://console.neo4j.org/console/cypher \
        | ruby -rjson -e 'puts JSON.dump(JSON.parse(STDIN.read)["visualization"])' \
        > $query.viz
    done
done

rm *.compiled
rm ../../viz/*
mv *.viz ../../viz/
cp *.frag* ../../viz/
