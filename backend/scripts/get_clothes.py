from flask import request, jsonify
from database.database import db_session
from database.models import ImageModel
from sqlalchemy import desc

def get_clothes():
    username = request.args.get('username')
    interaction_type = request.args.get('interaction')
    
    query = db_session.query(ImageModel).filter(ImageModel.username == username)
    
    if interaction_type:
        query = query.filter(ImageModel.interaction == interaction_type)
    
    clothes = query.order_by(ImageModel.id.desc()).all()
    
    clothes_list = [{
        "id": clothe.id, 
        "username": clothe.username, 
        "file_url": clothe.file_url, 
        "interaction": clothe.interaction, 
        "like": clothe.like
    } for clothe in clothes]

    print(f"Username: {username}, Interaction: {interaction_type}")
    
    return jsonify(clothes_list)