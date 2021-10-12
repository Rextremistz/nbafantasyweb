import csv
import mysql.connector
import os

mydb = mysql.connector.connect(
    host="localhost",
    user=os.environ.get('DB_USER'),
    passwd=os.environ.get('DB_PASS'),
    database="nbafantasyweb_db"
)

mycursor = mydb.cursor()
# mycursor.execute("CREATE DATABASE nbafantasyweb_db")

with open('fantasy_tableforsql.csv') as c:
    reader = csv.reader(c, delimiter=',')
    all_value = []
    for row in reader:
        value = (row[0], row[1], row[2], row[3], row[4], row[5],
                 row[6], row[7], row[8], row[9], row[10], row[11], row[12])
        all_value.append(value)


delete = "DELETE FROM myapp_player"


insert = "INSERT INTO myapp_player (name, y1_points, y2_points, y3_points, y1_average, y2_average, y3_average, y1_games, y2_games, y3_games, y1_price, y2_price, y3_price) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"


mycursor.execute(delete)
mycursor.executemany(insert, all_value)

mydb.commit()
