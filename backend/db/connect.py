# app/database.py
import sqlite3
from contextlib import contextmanager

DATABASE_NAME = "./db/cpms.db"

# Creates connection for each request
def get_db_connection():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row  # enables dict-like row access
    return conn


# Context manager for executing SQL
@contextmanager
def get_cursor():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        yield cursor
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        conn.close()
