from firebase_admin import firestore
from firestore import db

PRODUCT_COLLECTION = 'products'

def create_product(name, description, user_id):
    data = {
        'name': name,
        'description': description,
        'user_id': user_id,
        'created_at': firestore.SERVER_TIMESTAMP
    }
    doc_ref = db.collection(PRODUCT_COLLECTION).add(data)
    return doc_ref[1].id

def get_product(product_id):
    doc_ref = db.collection(PRODUCT_COLLECTION).document(product_id)
    doc = doc_ref.get()
    if doc.exists:
        product = doc.to_dict()
        product['id'] = doc.id
        return product
    return None

def get_products_by_user(user_id):
    docs = db.collection(PRODUCT_COLLECTION).where('user_id', '==', user_id).stream()
    products = []
    for doc in docs:
        product = doc.to_dict()
        product['id'] = doc.id
        products.append(product)
    return products

def update_product(product_id, data):
    doc_ref = db.collection(PRODUCT_COLLECTION).document(product_id)
    doc_ref.update(data)
    return True

def delete_product(product_id):
    doc_ref = db.collection(PRODUCT_COLLECTION).document(product_id)
    doc_ref.delete()
    return True
