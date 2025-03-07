#!/bin/bash

# Create the output directories if they don't exist
mkdir -p public/json_data
mkdir -p public/yaml_data

# Loop through all .cue files in the cue_data directory
for file in cue_data/*.cue;
do
    # Extract the base name of the file (without directory and extension)
    base=$(basename "$file" .cue)

    # CUE file to JSON
    cue export "$file" -o "public/json_data/${base}.json" -f

    # CUE file to YAML
    cue export "$file" -o "public/yaml_data/${base}.yaml" --out yaml -f
done
