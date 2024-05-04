from flask import Flask, request, jsonify
from flask_caching import Cache
from flask_cors import CORS
import spacy

app = Flask(__name__)
CORS(app)

# Configure Flask-Caching to use Memcached
cache = Cache(app, config={'CACHE_TYPE': 'memcached', 'CACHE_MEMCACHED_SERVERS': ['127.0.0.1:11211']})

# Load spaCy models for different languages at application startup
language_models = {
    'en': spacy.load('en_core_web_sm'),
    'pl': spacy.load('pl_core_news_sm'),
    'de': spacy.load('de_core_news_sm')
}

# Endpoint to tokenize sentence and return words with their roots based on language
@app.route('/tokenize/<language>', methods=['POST'])
@cache.cached(timeout=24 * 60 * 60)  # Cache results for 60 seconds
def tokenize_sentence(language):
    data = request.get_json()
    sentence = data['sentence']

    if language in language_models:
        nlp = language_models[language]

        app.logger.info('Computing tokens for sentence: %s', sentence)

        doc = nlp(sentence)

        app.logger.info('Tokens computed successfully')

        tokens = [{'word': token.text, 'root': token.lemma_} for token in doc]
        return jsonify(tokens)
    else:
        return jsonify({'error': 'Language not supported'})

@app.route('/cache-info')
def cache_info():
    return jsonify(cache.cache._stats)

if __name__ == '__main__':
    app.run(debug=True)
