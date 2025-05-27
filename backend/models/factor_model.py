from firebase_admin import firestore
from firestore import db

FACTOR_COLLECTION = 'factors'

def create_factor(name, unit, value_per_unit, category, region="Taiwan", source="環境部"):
    data = {
        'name': name,
        'unit': unit,
        'value_per_unit': float(value_per_unit),
        'category': category,
        'region': region,
        'source': source,
        'created_at': firestore.SERVER_TIMESTAMP,
        'usage_count': 0  # Initialize usage count
    }
    doc_ref = db.collection(FACTOR_COLLECTION).add(data)
    return doc_ref[1].id

def get_factor(factor_id):
    doc_ref = db.collection(FACTOR_COLLECTION).document(factor_id)
    doc = doc_ref.get()
    if doc.exists:
        factor = doc.to_dict()
        factor['id'] = doc.id
        return factor
    return None

def get_factors_by_category(category):
    docs = db.collection(FACTOR_COLLECTION).where('category', '==', category).stream()
    factors = []
    for doc in docs:
        factor = doc.to_dict()
        factor['id'] = doc.id
        factors.append(factor)
    return factors

def get_factors_by_region(region):
    docs = db.collection(FACTOR_COLLECTION).where('region', '==', region).stream()
    factors = []
    for doc in docs:
        factor = doc.to_dict()
        factor['id'] = doc.id
        factors.append(factor)
    return factors

def get_most_used_factors(limit=10):
    docs = db.collection(FACTOR_COLLECTION).order_by('usage_count', direction=firestore.Query.DESCENDING).limit(limit).stream()
    factors = []
    for doc in docs:
        factor = doc.to_dict()
        factor['id'] = doc.id
        factors.append(factor)
    return factors

def increment_usage_count(factor_id):
    doc_ref = db.collection(FACTOR_COLLECTION).document(factor_id)
    doc_ref.update({
        'usage_count': firestore.Increment(1)
    })
    return True

def update_factor(factor_id, data):
    # Ensure value_per_unit is float if provided
    if 'value_per_unit' in data:
        data['value_per_unit'] = float(data['value_per_unit'])
    doc_ref = db.collection(FACTOR_COLLECTION).document(factor_id)
    doc_ref.update(data)
    return True

def delete_factor(factor_id):
    doc_ref = db.collection(FACTOR_COLLECTION).document(factor_id)
    doc_ref.delete()
    return True
