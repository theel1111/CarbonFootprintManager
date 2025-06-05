import sys
import os
from dotenv import load_dotenv

# Ensure the root path is in sys.path for imports to work
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# ✅ Load .env before importing anything that uses os.getenv
load_dotenv()

# ✅ Now you can import modules that use env vars
from database import init_db

if __name__ == '__main__':
    print("📦 Initializing database...")
    init_db()
    print("✅ Database initialized successfully!")
