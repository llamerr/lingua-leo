import spacy

# Load spaCy models for English, Polish, and German
nlp_en = spacy.load('en_core_web_sm')
nlp_pl = spacy.load('pl_core_news_sm')
nlp_de = spacy.load('de_core_news_sm')

# Sample sentences in different languages
english_sentence = "NLTK provides tools for natural language processing."
polish_sentence = "Program NLTK zawiera narzędzia do przetwarzania języka naturalnego."
german_sentence = "NLTK bietet Werkzeuge für die natürliche Sprachverarbeitung."

# Tokenize sentences into words and retrieve lemmas (root forms)
def get_lemmas(sentence, nlp):
    doc = nlp(sentence)
    lemmas = [token.lemma_ for token in doc]
    return lemmas

# Get lemmas for English, Polish, and German sentences
english_lemmas = get_lemmas(english_sentence, nlp_en)
polish_lemmas = get_lemmas(polish_sentence, nlp_pl)
german_lemmas = get_lemmas(german_sentence, nlp_de)

# Display the lemmas
print("English lemmas:", english_lemmas)
print("Polish lemmas:", polish_lemmas)
print("German lemmas:", german_lemmas)