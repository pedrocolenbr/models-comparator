from openai import OpenAI
import os

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def call_openai(prompt, model="gpt-3.5-turbo", temperature=0.5, system_prompt=None):  
    if system_prompt is None:
        system_prompt = "You are a helpful assistant."
        
    completion = client.chat.completions.create(
        model=model,
        messages=[
            {
            "role": "system",
            "content": system_prompt
            },
            {
            "role": "user",
            "content": prompt
            }
        ],
        temperature=temperature,
    )
    return completion.choices[0].message.content
