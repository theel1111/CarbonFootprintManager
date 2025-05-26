from firebase_admin import firestore
from firestore import db
from werkzeug.security import generate_password_hash, check_password_hash

USER_COLLECTION = 'users'


def create_user(account, password, user_name):
    hashed_password = generate_password_hash(password)
    data = {
        'account': account,
        'password': hashed_password,
        'user_name': user_name,
        'created_at': firestore.SERVER_TIMESTAMP
    }
    doc_ref = db.collection(USER_COLLECTION).add(data)
    return None


def get_user_by_account(account):
    docs = db.collection(USER_COLLECTION).where('account', '==', account).limit(1).stream()
    for doc in docs:
        user = doc.to_dict()
        user['id'] = doc.id
        return user
    return None

def verify_password(stored_password, provided_password):
    return check_password_hash(stored_password, provided_password)
