"""Create the users table if it does not exist."""

from dbhandler import DbHandler


def create_quotes_table(connection):
    sql_create_quotes_table = open("./sql/create_table_users.sql", "r", encoding="utf-8").read()
    db.execute(connection, sql_create_quotes_table)


if __name__ == "__main__":

    print("\n############ Creating the users table ############\n")

    db = DbHandler()
    try:
        conn = db.create_connection()
        create_quotes_table(conn)
        conn.commit()
    except Exception as e:
        print("Error: Could not create table!")
        print(e)

    print("Users table created successfully.")