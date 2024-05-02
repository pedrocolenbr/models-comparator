import os
from flask import Blueprint, jsonify, request
import time
from app.services import openai, anthropic, gemini

bp = Blueprint('routes', __name__)

@bp.route('/models', methods=['GET'])
def models():
    models = os.environ.get("MODELS", "").split(",")
    return jsonify({"models": models})

@bp.route('/gpt_35_turbo', methods=['POST'])
def gpt_35_turbo():
    prompt = request.json.get("prompt")
    if not prompt:
        return jsonify({"message": "A prompt is required"}), 400
    
    temperature = request.json.get("temperature", 0.5)
    system_prompt = request.json.get("system_prompt", None)

    start_time = time.time()
    response = openai.call_openai(prompt, "gpt-3.5-turbo", temperature, system_prompt)
    end_time = time.time()
    response_time = end_time - start_time

    return jsonify({"response": response, "response_time": response_time})

@bp.route('/claude-3', methods=['POST'])
def claude():
    prompt = request.json.get("prompt")
    if not prompt:
        return jsonify({"message": "A prompt is required"}), 400
    
    temperature = request.json.get("temperature", 0.5)
    system_prompt = request.json.get("system_prompt", None)

    start_time = time.time()
    response = anthropic.call_anthropic(prompt, "claude-3-opus-20240229", temperature, system_prompt)
    end_time = time.time()
    response_time = end_time - start_time
    return jsonify({"response": response, "response_time": response_time})

@bp.route('/gemini', methods=['POST'])
def gemini_pro():
    prompt = request.json.get("prompt")
    if not prompt:
        return jsonify({"message": "A prompt is required"}), 400
    
    temperature = request.json.get("temperature", 0.5)
    system_prompt = request.json.get("system_prompt", None)

    start_time = time.time()
    response = gemini.call_gemini(prompt, "gemini-pro", temperature, system_prompt)
    end_time = time.time()
    response_time = end_time - start_time

    return jsonify({"response": response, "response_time": response_time})

@bp.route('/prompt_model', methods=['POST'])
def prompt_model():
    prompt = request.json.get("prompt")
    model = request.json.get("model")
    if not prompt:
        return jsonify({"message": "A prompt is required"}), 400
    if not model:
        return jsonify({"message": "A model is required"}), 400

    models = {
        "gpt-3.5-turbo": openai.call_openai,
        "claude-3-opus-20240229": anthropic.call_anthropic,
        "gemini-pro": gemini.call_gemini
    }

    if model not in models:
        return jsonify({"message": "Model not found"}), 400

    temperature = request.json.get("temperature", 0.5)
    system_prompt = request.json.get("system_prompt", None)

    start_time = time.time()
    response = models[model](prompt, model, temperature, system_prompt)
    end_time = time.time()
    response_time = end_time - start_time

    return jsonify({"response": response, "response_time": response_time})