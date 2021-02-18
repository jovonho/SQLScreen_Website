import psycopg2
import psycopg2.extras
from dbconfig import config


def NoneHandlerStr(value, cur):
    if value is None:
        return "-"
    return value


# def NoneHandlerNum(value, cur):
#     if value is None:
#         return 0
#     return value


NoneHandlerStrType = psycopg2.extensions.new_type((25, 114), "NoneHandlerStr", NoneHandlerStr)
# NoneHandlerNumType = psycopg2.extensions.new_type((20, 23, 1700), "NoneHandlerNum", NoneHandlerNum)


class DbHandler:
    def __init__(self):
        super()

    def create_connection(self):
        """ create a database connection to a PostgreSQL database """
        conn = None
        try:
            params = config()
            print("Connecting to db...")
            conn = psycopg2.connect(**params)

            cur = conn.cursor()
            cur.execute("SELECT version()")
            db_version = cur.fetchone()
            print(f"PostgreSQL version {db_version}")

            psycopg2.extensions.register_type(NoneHandlerStrType)
            cur.close()

        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            return conn

    def execute(self, conn, sql_statement):
        result = None
        try:
            c = conn.cursor()
            c.execute(sql_statement)
            result = c.fetchall()
            c.close()
        except Exception as e:
            print(e)
        finally:
            return result

    def execute_self_contained(self, sql_statement):
        conn = self.create_connection()

        result = None
        try:
            cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
            cursor.execute(sql_statement)
            result = cursor.fetchall()
        except Exception as e:
            print(e)
        finally:
            cursor.close()
            conn.commit()
            conn.close()
            return result
