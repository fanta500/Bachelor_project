import csv
csv_columns = []
csv_join = []
schema = "schema: { \n"
with open("G:/KEPLER_DATA/q1-q17_dr25.csv") as f:
    reader = csv.reader(f, delimiter=',')
    schema = "schema: { \n"
    line = 0
    for row in reader:
        csv_columns.append(row)   
        line += 1
        if line > 1:
            break
    for i in range(len(csv_columns[0])):
        csv_join.append(str(csv_columns[0][i])+": '"+str(csv_columns[1][i])+"'")
    for elem in csv_join:
        schema += elem + ", \n"
schema += "}"
print(schema)