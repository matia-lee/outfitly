from flask import request, jsonify
from database.database import db_session
from database.models import ImageModel
from sqlalchemy import desc

def get_clothes():
    username = request.args.get("username")
    interaction_filter = request.args.get("interaction")
    query = db_session.query(ImageModel)
    
    if username:
        query = query.filter(ImageModel.username == username) 

    if interaction_filter:
        query = query.filter(ImageModel.interaction == interaction_filter)
    
    clothes = query.order_by(desc(ImageModel.id))
    clothes_list = [{"id": image.id, "username": image.username, "file_url": image.file_url, "interaction": image.interaction, "like": image.like} for image in clothes]
    return jsonify(clothes_list)