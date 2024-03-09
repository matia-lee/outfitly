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


#for removing background and saving to aws
s3 = boto3.client('s3', aws_access_key_id=os.getenv('aws_access_key_id'), aws_secret_access_key=os.getenv('aws_secret_access_key'), region_name=os.getenv('region_name'))
BUCKET_NAME = 'outfitly'

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify(error="No file part"), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(error="No selected file"), 400
    if file:
        filename = secure_filename(file.filename)
        input_path = os.path.join('/tmp', filename)
        output_path = os.path.join('/tmp', 'processed_' + filename)
        
        file.save(input_path)
        
        remove_background_and_save(input_path, output_path)

        with Image.open(output_path) as img:
            # if img.mode != 'RGB':
            #     img = img.convert('RGB')
            img = img.resize((400, 320))
            img = img.rotate(270)
            img.save(output_path)
        
        try:
            s3.upload_file(output_path, BUCKET_NAME, 'path/in/bucket/' + filename)
        except Exception as e:
            print(e)
            return jsonify(error=str(e)), 500
        file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/path/in/bucket/{filename}"

        image_record = ImageModel(filename=filename, s3_path='path/in/bucket/' + filename, file_url=file_url)
        db_session.add(image_record)
        db_session.commit()

        # return jsonify(message="File uploaded and processed successfully", filename=filename), 200
        return jsonify(message="File uploaded and processed successfully", filename=filename, url=file_url), 200

        
if __name__ == '__main__':
    init_db()
    app.run(debug=True)