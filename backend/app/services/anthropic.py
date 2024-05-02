import anthropic
import os

client = anthropic.Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY"),
)

def call_anthropic(prompt, model="claude-3-opus-20240229", temperature=0.5, system_prompt=None):
    if system_prompt is None:
        system_prompt = "You are a helpful assistant."

    message = client.messages.create(
        model=model,
        system=system_prompt,
        max_tokens=1024,
        messages=[
            {
            "role": "user",
            "content": prompt
            }
        ],
        temperature=temperature,
    )

    return message.content[0].text
