import os
from flask import Blueprint, jsonify, request
import time
from app.services import openai, anthropic, gemini

bp = Blueprint('routes', __name__)

models = {
    "gpt-3.5-turbo": openai.call_openai,
    "gpt-4": openai.call_openai,
    "gpt-4-turbo": openai.call_openai,
    "gemini-1.0-pro": gemini.call_gemini,
    "gemini-1.5-pro-latest": gemini.call_gemini,
    "claude-3-opus-20240229": anthropic.call_anthropic,
    "claude-3-sonnet-20240229": anthropic.call_anthropic,
    "claude-3-haiku-20240307": anthropic.call_anthropic
}

@bp.route('/models', methods=['GET'])
def models_route():
    models_list = list(models.keys())
    return jsonify({"models": models_list})

@bp.route('/prompt_model', methods=['POST'])
def prompt_model():
    prompt = request.json.get("prompt")
    model = request.json.get("model")
    if not prompt:
        return jsonify({"message": "A prompt is required"}), 400
    if not model:
        return jsonify({"message": "A model is required"}), 400

    if model not in models:
        return jsonify({"message": "Model not found"}), 400

    temperature = request.json.get("temperature", 0.5)
    system_prompt = request.json.get("system_prompt", None)

    start_time = time.time()
    response = models[model](prompt, model, temperature, system_prompt)
    end_time = time.time()
    response_time = end_time - start_time

    return jsonify({"response": response, "response_time": response_time})
