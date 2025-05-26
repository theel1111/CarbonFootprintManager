import os
import firebase_admin
from firebase_admin import credentials, firestore

key_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
cred = credentials.Certificate(key_path)
firebase_admin.initialize_app(cred)

db = firestore.client()  # Export this for other modules to use
