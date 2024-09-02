import os

import pandas as pd
import openai
from openai import OpenAI
import random
from dotenv import load_dotenv

load_dotenv()
dataset_path = 'Mental_Health_FAQ.csv'
df = pd.read_csv(dataset_path)

memes_urls = [
    "https://th.bing.com/th/id/OIP.y8XbQLgcLxfZD04t_LTVogAAAA?rs=1&pid=ImgDetMain",
    "https://i.redd.it/tqmjpwqyxln51.jpg",
    "https://themindsjournal.com/wp-content/uploads/2023/04/anxiety-meme-2-tmj.jpg"
]

spotify_playlist_link = "https://open.spotify.com/playlist/3RJhsyXXNoZ5kFP6kGCHmV?si=01515c96203a4821"

openai.api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=openai.api_key)

def get_response(user_input):

    if user_input.lower() == 'quit':
        return "Goodbye!", None

    def get_answer_from_dataset(user_input):
        for idx, question in enumerate(df['Questions']):
            if user_input.lower() == question.lower():
                return df.iloc[idx]['Answers']
        return None

    answer_from_dataset = get_answer_from_dataset(user_input)

    if answer_from_dataset:
        return answer_from_dataset, None
    elif any(keyword in user_input.lower() for keyword in ['low', 'bad', 'mood off', 'anxious', 'depressed', 'sad', 'demotivated']) and 'meme' in user_input.lower():
        random_meme_url = random.choice(memes_urls)
        return "Here's a meme to lighten up your mood. Did that help? What else can I do for you?", random_meme_url

    elif 'playlist' in user_input.lower():
        return "Here's a Spotify playlist for anxiety/depression: " + spotify_playlist_link, None
    else:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": "Give the answer to this specific prompt that i mention below. If it is not related to mental health then refuse to answer it becasue it is not related to mental health but do allow and respond to normal gratitude messages like 'Hi', 'Bye', 'Thank You'. here is the prompt:" +user_input,
                }
            ],
            model="gpt-3.5-turbo",
        )
        chatbot_response = chat_completion.choices[0].message.content
        return chatbot_response, None