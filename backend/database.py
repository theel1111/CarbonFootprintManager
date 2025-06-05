import mysql.connector
from mysql.connector import Error
from contextlib import contextmanager
import os

# Database configuration from environment variables
DB_CONFIG = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME')
}


@contextmanager
def get_db():
    """Context manager for database connections"""
    conn = None
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        yield conn
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        raise
    finally:
        if conn and conn.is_connected():
            conn.close()

def init_db():
    """Initialize the database with all required tables"""
    # First create the database if it doesn't exist
    temp_config = DB_CONFIG.copy()
    temp_config.pop('database', None)
    
    try:
        conn = mysql.connector.connect(**temp_config)
        cursor = conn.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_CONFIG['database']}")
        conn.close()
    except Error as e:
        print(f"Error creating database: {e}")
        raise

    # Now create all the tables
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Create users table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                account VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                user_name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create factors table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS factors (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                unit VARCHAR(50) NOT NULL,
                value_per_unit DECIMAL(10,4) NOT NULL,
                category VARCHAR(100) NOT NULL,
                region VARCHAR(100) DEFAULT 'Taiwan',
                source VARCHAR(100) DEFAULT '環境部',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                usage_count INT DEFAULT 0
            )
        ''')
        
        # Create products table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                user_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        ''')
        
        # Create emission_stages table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS emission_stages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create emissions table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS emissions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                product_id INT NOT NULL,
                stage_id INT NOT NULL,
                factor_id INT NOT NULL,
                quantity DECIMAL(10,4) NOT NULL,
                created_by INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                emission_amount DECIMAL(10,4) NOT NULL,
                transport_origin VARCHAR(255),
                transport_method VARCHAR(100),
                transport_unit VARCHAR(50),
                distance_per_trip DECIMAL(10,2),
                usage_ratio DECIMAL(5,2),
                allocation_basis VARCHAR(100),
                fuel_input_per_unit DECIMAL(10,4),
                fuel_input_unit VARCHAR(50),
                land_transport_tkm DECIMAL(10,2),
                FOREIGN KEY (product_id) REFERENCES products(id),
                FOREIGN KEY (stage_id) REFERENCES emission_stages(id),
                FOREIGN KEY (factor_id) REFERENCES factors(id),
                FOREIGN KEY (created_by) REFERENCES users(id)
            )
        ''')
        
        # Create reports table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS reports (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                cf_id INT NOT NULL,
                created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                total_emissions DECIMAL(10,4) DEFAULT 0,
                status VARCHAR(20) DEFAULT 'draft',
                FOREIGN KEY (cf_id) REFERENCES products(id)
            )
        ''')
        
        conn.commit()

# Initialize the database when the module is imported
if __name__ == '__main__':
    init_db() 