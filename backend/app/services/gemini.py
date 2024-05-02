import google.generativeai as genai # type: ignore
import os

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def call_gemini(prompt, model="gemini-pro", temperature=0.5, system_prompt=None):
    model = genai.GenerativeModel(model)

    if system_prompt is None:
        system_prompt = "You are a helpful assistant."

    response = model.generate_content(
        prompt,
        generation_config=genai.types.GenerationConfig(
            temperature=temperature
        )
    )

    return response.text
