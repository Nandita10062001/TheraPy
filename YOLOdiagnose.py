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
        model = YOLO('best(1).pt')

def predict(disease):
    load_model()
    #get most recent file in uploaded_picture directory
    most_recent_file = max(['uploaded_picture' + '/' + f for f in os.listdir('uploaded_picture')], key=os.path.getctime)
    result = model.predict(most_recent_file)
    os.remove(most_recent_file)
    probs = result[0].probs.data.cpu().numpy()
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