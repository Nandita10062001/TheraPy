from ultralytics import YOLO
import numpy
import os
from dotenv import load_dotenv
load_dotenv()
import openai
from openai import OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=openai.api_key)

model = None

def load_model():
    global model
    if model is None:
        try:
            model = YOLO('best.pt')
            print("Model loaded successfully.")
        except Exception as e:
            print(f"Error loading model: {e}")

def predict(disease):
    load_model()
    uploaded_dir = 'uploaded_picture'
    if not os.path.exists(uploaded_dir) or not os.listdir(uploaded_dir):
        return "No images found in the upload directory."

    most_recent_file = max([os.path.join(uploaded_dir, f) for f in os.listdir(uploaded_dir)], key=os.path.getctime)
    print(f"Using file: {most_recent_file}")

    try:
        result = model.predict(most_recent_file)
    except Exception as e:
        return f"Error predicting image: {e}"

    probs = result[0].probs.data.cpu().numpy()
    print(f"Prediction probabilities: {probs}")
    if disease.lower() == 'adhd':
        disease = 'ADHD'
        prob = probs[0]
        not_prob = probs[1] + probs[2] + probs[3]
    elif disease.lower() == 'alzheimers':
        disease = 'Alzheimer\'s'
        prob = probs[1]
        not_prob = probs[0] + probs[2] + probs[3]
    elif disease.lower() == 'schizophrenia':
        disease = 'Schizophrenia'
        prob = probs[3]
        not_prob = probs[0] + probs[1] + probs[2]

    if prob>not_prob:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"I have {disease}. Give me some tips to manage it. Give small tips"
                }
            ],
            model="gpt-3.5-turbo",
        )
        chatbot_response = chat_completion.choices[0].message.content
        return f"There is a {round(prob*100,1)}% chance that you have {disease}. {chatbot_response}"
    return f"There is a {round(not_prob*100,1)}% chance that you do not have {disease}"