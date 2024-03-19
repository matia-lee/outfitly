from flask import request, jsonify
from database.database import db_session
from database.models import ImageModel

def get_specific_clothes():
    interaction_type = request.args.get('interaction')
    images = db_session.query(ImageModel).filter_by(interaction = interaction_type).all()
    image_urls = [image.file_url for image in images]
    return jsonify(image_urls)