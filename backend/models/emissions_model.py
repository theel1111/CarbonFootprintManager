from firebase_admin import firestore
from firestore import db
from models.factor import increment_usage_count, get_factor

EMISSION_COLLECTION = 'emissions'

def create_emission(product_id, stage_id, factor_id, quantity, created_by, 
                   transport_origin=None, transport_method=None, transport_unit=None,
                   distance_per_trip=None, usage_ratio=None, allocation_basis=None,
                   fuel_input_per_unit=None, fuel_input_unit=None, land_transport_tkm=None):
    # Get factor to calculate emission amount
    factor = get_factor(factor_id)
    emission_amount = quantity * factor['value_per_unit'] if factor else 0

    data = {
        'product_id': product_id,
        'stage_id': stage_id,
        'factor_id': factor_id,
        'quantity': float(quantity),
        'created_by': created_by,
        'created_at': firestore.SERVER_TIMESTAMP,
        'emission_amount': emission_amount,
        'transport_origin': transport_origin,
        'transport_method': transport_method,
        'transport_unit': transport_unit,
        'distance_per_trip': float(distance_per_trip) if distance_per_trip is not None else None,
        'usage_ratio': float(usage_ratio) if usage_ratio is not None else None,
        'allocation_basis': allocation_basis,
        'fuel_input_per_unit': float(fuel_input_per_unit) if fuel_input_per_unit is not None else None,
        'fuel_input_unit': fuel_input_unit,
        'land_transport_tkm': float(land_transport_tkm) if land_transport_tkm is not None else None
    }
    
    # Remove None values
    data = {k: v for k, v in data.items() if v is not None}
    
    doc_ref = db.collection(EMISSION_COLLECTION).add(data)
    # Increment the usage count of the factor
    increment_usage_count(factor_id)
    return doc_ref[1].id

def get_emission(emission_id):
    doc_ref = db.collection(EMISSION_COLLECTION).document(emission_id)
    doc = doc_ref.get()
    if doc.exists:
        emission = doc.to_dict()
        emission['id'] = doc.id
        return emission
    return None

def get_emissions_by_product(product_id):
    docs = db.collection(EMISSION_COLLECTION).where('product_id', '==', product_id).stream()
    emissions = []
    for doc in docs:
        emission = doc.to_dict()
        emission['id'] = doc.id
        emissions.append(emission)
    return emissions

def get_emissions_by_stage(stage_id):
    docs = db.collection(EMISSION_COLLECTION).where('stage_id', '==', stage_id).stream()
    emissions = []
    for doc in docs:
        emission = doc.to_dict()
        emission['id'] = doc.id
        emissions.append(emission)
    return emissions

def get_emissions_by_product_and_stage(product_id, stage_id):
    docs = (db.collection(EMISSION_COLLECTION)
            .where('product_id', '==', product_id)
            .where('stage_id', '==', stage_id)
            .stream())
    emissions = []
    for doc in docs:
        emission = doc.to_dict()
        emission['id'] = doc.id
        emissions.append(emission)
    return emissions

def update_emission(emission_id, data):
    # If quantity or factor_id is updated, recalculate emission_amount
    if 'quantity' in data or 'factor_id' in data:
        current_emission = get_emission(emission_id)
        factor_id = data.get('factor_id', current_emission['factor_id'])
        quantity = data.get('quantity', current_emission['quantity'])
        
        factor = get_factor(factor_id)
        if factor:
            data['emission_amount'] = float(quantity) * factor['value_per_unit']
    
    # Convert numeric fields to float
    numeric_fields = ['quantity', 'distance_per_trip', 'usage_ratio', 
                     'fuel_input_per_unit', 'land_transport_tkm']
    for field in numeric_fields:
        if field in data and data[field] is not None:
            data[field] = float(data[field])

    doc_ref = db.collection(EMISSION_COLLECTION).document(emission_id)
    doc_ref.update(data)
    return True

def delete_emission(emission_id):
    doc_ref = db.collection(EMISSION_COLLECTION).document(emission_id)
    doc_ref.delete()
    return True

def calculate_total_emissions_by_product(product_id):
    emissions = get_emissions_by_product(product_id)
    return sum(emission['emission_amount'] for emission in emissions)

def calculate_emissions_by_stage(product_id):
    emissions = get_emissions_by_product(product_id)
    stage_totals = {}
    for emission in emissions:
        stage_id = emission['stage_id']
        if stage_id not in stage_totals:
            stage_totals[stage_id] = 0
        stage_totals[stage_id] += emission['emission_amount']
    return stage_totals
