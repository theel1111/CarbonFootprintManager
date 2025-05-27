from firebase_admin import firestore
from firestore import db

STAGE_COLLECTION = 'emission_stages'

def create_stage(name):
    data = {
        'name': name,
        'created_at': firestore.SERVER_TIMESTAMP
    }
    doc_ref = db.collection(STAGE_COLLECTION).add(data)
    return doc_ref[1].id

def get_stage(stage_id):
    doc_ref = db.collection(STAGE_COLLECTION).document(stage_id)
    doc = doc_ref.get()
    if doc.exists:
        stage = doc.to_dict()
        stage['id'] = doc.id
        return stage
    return None

def get_all_stages():
    docs = db.collection(STAGE_COLLECTION).stream()
    stages = []
    for doc in docs:
        stage = doc.to_dict()
        stage['id'] = doc.id
        stages.append(stage)
    return stages

def update_stage(stage_id, data):
    doc_ref = db.collection(STAGE_COLLECTION).document(stage_id)
    doc_ref.update(data)
    return True

def delete_stage(stage_id):
    doc_ref = db.collection(STAGE_COLLECTION).document(stage_id)
    doc_ref.delete()
    return True 