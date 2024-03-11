from flask import Flask, request, jsonify
from flask_cors import CORS
from database.database import init_db
from scripts.signup import signup
from scripts.get_username import get_username
import boto3
from werkzeug.utils import secure_filename
from scripts.background_remover import remove_background_and_save
from PIL import Image
from database.models import ImageModel
from database.database import db_session
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"]}})


#for database
#for signing up/ logging in 
app.add_url_rule('/signup', view_func=signup, methods=['POST'])
#for grabbing username for authcontext
app.add_url_rule('/get_username', view_func=get_username, methods=['GET'])

s3 = boto3.client('s3', aws_access_key_id=os.getenv('aws_access_key_id'), aws_secret_access_key=os.getenv('aws_secret_access_key'), region_name=os.getenv('region_name'))
BUCKET_NAME = 'outfitly'

temp_file_paths = {}

@app.route('/temporary_upload', methods=['POST'])
def upload_file():
    global temp_file_paths 

    if 'file' not in request.files:
        return jsonify(error="No file part"), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(error="No selected file"), 400
    if file:
        filename = secure_filename(file.filename)
        temp_input_path = os.path.join('/tmp', filename)
        processed_file_path = os.path.join('/tmp', 'processed_' + filename)  
        
        file.save(temp_input_path)
        
        remove_background_and_save(temp_input_path, processed_file_path)

        with Image.open(processed_file_path) as img:
            img = img.resize((400, 320))
            img = img.rotate(270)
            img.save(processed_file_path)

        temp_file_paths[filename] = {
            'path': processed_file_path,
            'temp_input_path': temp_input_path
        }

        try:
            s3.upload_file(processed_file_path, BUCKET_NAME, 'path/in/bucket/' + filename)
        except Exception as e:
            print(e)
            return jsonify(error=str(e)), 500
        file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/path/in/bucket/{filename}"

        return jsonify({
            'message': 'File uploaded successfully, awaiting confirmation',
            'tempId': filename,
            'url': file_url
        }), 200

@app.route('/commit_upload', methods=['POST'])
def commit_upload():
    data = request.get_json()
    url = data.get('url')
    username = data.get('username')

    if not url or not username:
        return jsonify(error="Missing data"), 400
    
    # existing_record = db_session.query(ImageModel).filter_by(username=username, file_url=url).first()
    # if existing_record:
    #     return jsonify(message="Exists"), 409
    
    try:
        image_record = ImageModel(username=username, file_url=url)
        db_session.add(image_record)
        db_session.commit()
    except Exception as e:
        db_session.rollback() 
        print(e)
        return jsonify(error="Error saving to database"), 500

    return jsonify(message="Upload committed successfully", url=url), 200

@app.route('/update_interaction', methods=['POST'])
def update_interaction():
    data = request.json
    image = db_session.query(ImageModel).filter_by(username=data['username'], file_url=data['url']).first()

    if image:
        image.interaction = data['interaction']
        db_session.commit()
        return jsonify({"message": "Interaction updated successfully"}), 200
    else:
        return jsonify({"error": "Image not found"}), 404

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == '__main__':
    init_db()
    app.run(debug=True)