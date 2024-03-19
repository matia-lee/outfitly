from flask import request, jsonify
from database.database import db_session
from database.models import ImageModel
from sqlalchemy import desc

def get_clothes():
    interaction_filter = request.args.get('interaction')
    if interaction_filter:
        clothes = db_session.query(ImageModel).filter(ImageModel.interaction == interaction_filter).order_by(desc(ImageModel.id))
    else:
        clothes = db_session.query(ImageModel).order_by(desc(ImageModel.id))
    clothes_list = [{"id": image.id, "username": image.username, "file_url": image.file_url, "interaction": image.interaction, "like": image.like} for image in clothes]
    return jsonify(clothes_list)