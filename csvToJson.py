import csv
import json
from pathlib import Path

csvFilePath = "fantasy_tableforsql.csv"

# read csv and add the data to a dictionary
# create list
data = []
with open(csvFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for csvRow in csvReader:  # add each line dictionary to the list
        data.append(csvRow)


# add data to a root node
root = {}
root['players'] = data

# write data to a json file
# with open(jsonFilePath, "w") as jsonFile:
#     jsonFile.write(json.dumps(root, indent=4))

base = Path('./static/data')
jsonFilePath = base / "fantasy.json"
base.mkdir(exist_ok=True)
jsonFilePath.write_text(json.dumps(root, indent=4))
