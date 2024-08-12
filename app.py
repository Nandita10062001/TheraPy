from flask import Flask, request, jsonify
from YOLOdiagnose import *
from AI_chatbot import *
from flask_cors import CORS, cross_origin
from questionnaire import *
import base64
import cv2
app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/predict/<disease>', methods=['POST'])
def predict_diagnosis(disease):
    try:
        image_data = request.json.get('imageData')
        if not image_data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Debugging print statements
        print("Received image data")

        base64_data = image_data.split(',')[1]
        image_data = base64.b64decode(base64_data)

        upload_dir = 'uploaded_picture'
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)

        image_path = os.path.join(upload_dir, 'image.jpg')
        
        # Debugging print statements
        print(f"Saving image to: {image_path}")

        with open(image_path, 'wb') as f:
            f.write(image_data)
        
        # Confirm that file was created
        if not os.path.isfile(image_path):
            raise FileNotFoundError(f"File was not created: {image_path}")

        load_model()  # Ensure YOLO model is loaded
        prediction = predict(disease)  # Pass the image path to predict
        
        os.remove(image_path)  # Clean up the uploaded image after prediction
        
        return jsonify({'prediction': prediction})

    except Exception as e:
        # More detailed error reporting
        print(f"Error in /predict endpoint: {e}")
        return jsonify({'error': 'An error occurred processing the request.'}), 500

@app.route('/anxiety', methods=['POST'])
def anxiety_diagonsis():
    data = request.json
    message = data['message']
    for i in range(len(message)):
        if message[i] == 'Often':
            message[i] = 4
        elif message[i] == 'Sometimes':
            message[i] = 3
        elif message[i] == 'Rarely':
            message[i] = 2
        elif message[i] == 'Never':
            message[i] = 1

    analysis = get_anxiety(message)
    return {'analysis': analysis}

@app.route('/depression', methods=['POST'])
def depression_diagonsis():
    data = request.json
    message = data['message']
    for i in range(len(message)):
        if message[i] == 'Often':
            message[i] = 4
        elif message[i] == 'Sometimes':
            message[i] = 3
        elif message[i] == 'Rarely':
            message[i] = 2
        elif message[i] == 'Never':
            message[i] = 1

    analysis = get_depression(message)
    return {'analysis': analysis}

@app.route('/ptsd', methods=['POST'])
def ptsd_diagonsis():
    data = request.json
    message = data['message']
    for i in range(len(message)):
        if message[i] == 'Often':
            message[i] = 4
        elif message[i] == 'Sometimes':
            message[i] = 3
        elif message[i] == 'Rarely':
            message[i] = 2
        elif message[i] == 'Never':
            message[i] = 1

    analysis = get_ptsd(message)
    return {'analysis': analysis}

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    message = data['message']
    output, meme = get_response(message)
    return {'message': output, 'meme': meme}





if __name__ == '__main__':
    app.run(debug=True)
