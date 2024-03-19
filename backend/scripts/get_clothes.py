from flask import request, jsonify
from database.database import db_session
from database.models import ImageModel

def get_clothes():
    interaction_filter = request.args.get('interaction')
    if interaction_filter:
        clothes = db_session.query(ImageModel).filter(ImageModel.interaction == interaction_filter)
    else:
        clothes = db_session.query(ImageModel)
    clothes_list = [{"id": image.id, "username": image.username, "file_url": image.file_url, "interaction": image.interaction, "like": image.like} for image in clothes]
    return jsonify(clothes_list)