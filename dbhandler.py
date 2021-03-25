import psycopg2
import psycopg2.extras
from configparser import SafeConfigParser

configfile = "./config/db.ini"


def NoneHandlerStr(value, cur):
    if value is None:
        return "-"
    return value


NoneHandlerStrType = psycopg2.extensions.new_type((25, 114), "NoneHandlerStr", NoneHandlerStr)


class DbHandler:
    def __init__(self):
        super()

    def config(self, filename=configfile, section="postgresql"):

        parser = SafeConfigParser()
        parser.read(filename)

        db = {}
        if parser.has_section(section):
            params = parser.items(section)
            for param in params:
                db[param[0]] = param[1]
        else:
            raise Exception("Section {0} not found in the {1} file".format(section, filename))

        return db

    def create_connection(self):
        """ create a database connection to a PostgreSQL database """
        conn = None
        try:
            params = self.config()
            # print("Connecting to db...")
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

    def exec_realdict(self, sql_statement):
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

    def exec_self_contained(self, sql_statement, return_multiple=False):
        conn = self.create_connection()

        result = None
        try:
            cur = conn.cursor()
            cur.execute(sql_statement)
            if return_multiple:
                result = cur.fetchall()
            else:
                result = cur.fetchone()
        except Exception as e:
            print(e)
        finally:
            cur.close()
            conn.commit()
            conn.close()
            return result

    def exec_self_contained(self, sql, tuple):
        conn = self.create_connection()
        result = None
        try:
            cursor = conn.cursor()
            cursor.execute(sql, tuple)
            result = cursor.fetchall()
        except Exception as e:
            print(e)
        finally:
            cursor.close()
            conn.commit()
            conn.close()
            return result