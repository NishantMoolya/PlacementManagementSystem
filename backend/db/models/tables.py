from db.connect import get_cursor

def create_tables():
    with get_cursor() as cur:
        cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password_hash TEXT,
            role TEXT,
            created_at TEXT
        );
        """)

        cur.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY,
            usn TEXT UNIQUE,
            branch TEXT,
            year INTEGER,
            cgpa REAL,
            backlogs INTEGER,
            tenth_percent REAL,
            twelfth_percent REAL,
            created_at TEXT,
            updated_at TEXT,
            FOREIGN KEY(id) REFERENCES users(id)
        );
        """)
        
        cur.execute("""
        CREATE TABLE IF NOT EXISTS tpos (
            id INTEGER PRIMARY KEY,
            designation TEXT,                -- Example: Senior TPO, Associate TPO
            phone TEXT,                      -- Contact number
            department TEXT,                 -- Training & Placement Dept / CSE / etc.
            created_at TEXT,
            updated_at TEXT,
            FOREIGN KEY(id) REFERENCES users(id)
        );
        """)

        cur.execute("""
        CREATE TABLE IF NOT EXISTS company_drives (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company_name TEXT,
            role TEXT,
            ctc TEXT,
            job_location TEXT,
            drive_date TEXT,
            registration_deadline TEXT,
            rounds_info TEXT,
            min_cgpa REAL,
            allowed_branches TEXT,
            min_year INTEGER,
            max_backlogs INTEGER,
            min_tenth_percent REAL,
            min_twelfth_percent REAL,
            created_by INTEGER,
            created_at TEXT,
            FOREIGN KEY(created_by) REFERENCES users(id)
        );
        """)

        cur.execute("""
        CREATE TABLE IF NOT EXISTS drive_registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            drive_id INTEGER,
            student_id INTEGER,
            registration_date TEXT,
            status TEXT DEFAULT 'registered',
            UNIQUE(drive_id, student_id),
            FOREIGN KEY(drive_id) REFERENCES company_drives(id),
            FOREIGN KEY(student_id) REFERENCES students(id)
        );
        """)
        

        cur.execute("""
        CREATE TABLE IF NOT EXISTS drive_attendance (
            drive_id INTEGER,
            student_id INTEGER,
            attended INTEGER DEFAULT 0,
            shortlist_status TEXT DEFAULT 'pending',
            updated_at TEXT,
            FOREIGN KEY(drive_id) REFERENCES company_drives(id),
            FOREIGN KEY(student_id) REFERENCES students(id),
            UNIQUE(drive_id, student_id)
        );
        """)

