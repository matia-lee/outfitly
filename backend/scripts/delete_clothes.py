from flask import jsonify
from database.database import db_session
from database.models import ImageModel

def delete_clothes(image_id):
    try:
        image = db_session.query(ImageModel).filter(ImageModel.id == image_id).first()
        if image:
            db_session.delete(image)
            db_session.commit()
            return jsonify({'message': 'Image deleted successfully'}), 200
        else:
            return jsonify({'error': 'Image not found'}), 404
    except Exception as e:
        db_session.rollback()
        return jsonify({'error': str(e)}), 500