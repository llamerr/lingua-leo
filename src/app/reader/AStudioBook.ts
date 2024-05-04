enum FromTo {
  From = 'from',
  To = 'to',
}

interface LangItem {
  sentences: number;
}

interface Head {
  creationtool: string;
  creationid: string;
  creationdate: string;
  paragraphs: number;
  langs: {
    lang: [
      // lang-from
      LangItem,
      // lang-to
      LangItem,
    ];
  };
  author: {
    s: [string, string];
  };
  title: {
    s: [string, string];
  };
  contents: {
    s: [string, string];
  };
}

interface BodyHeader {
  su: [string, string];
}

interface BodySentence {
  '#text': string;
  '@_lang': FromTo;
}

export interface BodyParagraph {
  '@_id': string;
  sentence: Array<{
    '@_id': string;
    su: [BodySentence, BodySentence];
  }>;
}

export interface Body {
  section: {
    header: BodyHeader;
    p: Array<BodyParagraph>;
  };
}

export interface BookRoot {
  head: Head;
  body: Body;
}
