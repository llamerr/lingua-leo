import nlp from 'compromise';
import type { Term } from 'compromise/types/misc';

type TokenizedSentence = Array<{
  word: string;
  root: string;
}>;

const tokenizeCompromise = (sentence: string): TokenizedSentence => {
  const doc = nlp(sentence).compute('root');
  const words = doc.terms().out('json');

  return words.map(({ terms, text }: { terms: (Term & { root: string })[]; text: string }) => ({
    word: text,
    root: terms[0]?.root || terms[0]?.normal,
  }));
};

const tokenizeSpacy = (sentence: string, language: string): Promise<TokenizedSentence> => {
  const data = { sentence };

  return fetch(`http://localhost:5000/tokenize/${language}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors here or return a default value
      return [];
    });
};

export const tokenizeSentence = (
  sentence: string,
  tokenizer: string = 'spacy',
  language: string = 'en',
): Promise<TokenizedSentence> => {
  return new Promise((resolve, reject) => {
    let tokens = [];
    switch (tokenizer) {
      case 'spacy':
        tokenizeSpacy(sentence, language)
          .then((spacyTokens) => resolve(spacyTokens))
          .catch((error) => reject(error));
        break;
      case 'compromise':
      default: {
        tokens = tokenizeCompromise(sentence);
        resolve(tokens);
      }
    }
  });
};
