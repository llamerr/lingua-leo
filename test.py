import nltk
nltk.download('punkt')  # Download the necessary data for tokenization

from nltk.tokenize import sent_tokenize

# Spanish paragraph
spanish_paragraph = "Mozart w listach swych pisze, że zdarzyło mu się słyszeć kompozycję   „od   razu”   jak   akord.   Patrzył   na   rozwinięty pomysł muzyczny jak na obraz,  jak na rzeźbę,  którą można ogarnąć jednym spojrzeniem. Podobnie Gluck dostrzegł jeden ze swych   utworów w formach   przestrzennych:   w rytmie"

spanish_sentences = sent_tokenize(spanish_paragraph, language='polish')  # Specify the language for tokenization

for sentence in spanish_sentences:
    print(sentence)
