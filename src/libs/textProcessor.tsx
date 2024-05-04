'use client';

import React from 'react';

import type { BodyParagraph, BookRoot } from '@/app/book/AStudioBook';
import { useProgressStore } from '@/app/book/progressStore';
import { Popover, PopoverContent, PopoverDescription, PopoverHeading, PopoverTrigger } from '@/components/Popover';
import { tokenizeSentence } from '@/libs/nlp';

export const processWord = (text: string, word?: string): React.JSX.Element => {
  return (
    <Popover>
      <PopoverTrigger>{text}</PopoverTrigger>
      <PopoverContent className="Popover">
        <PopoverHeading>My popover heading1212</PopoverHeading>
        <PopoverDescription>{word || text}</PopoverDescription>
      </PopoverContent>
    </Popover>
  );
};

export const processSentence = (sentence: string): React.JSX.Element => {
  const { addCompleted } = useProgressStore.getState();

  const wordsPromise = tokenizeSentence(sentence);

  const wordsElement = wordsPromise.then((words) => {
    // adding 0.5 since it's involved twice per sentence - for left and right translations
    addCompleted(0.5);

    return (
      <>
        {words.map(({ word, root }, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <span key={index}>
            {processWord(word, root)}
            {'\u00A0'}
          </span>
        ))}
      </>
    );
  });

  // Returning a placeholder while waiting for the promise to resolve
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{wordsElement}</>;
};

export const processParagraph = (paragraph: BodyParagraph): React.JSX.Element => {
  const { addTotal } = useProgressStore.getState();

  const sentences = paragraph.sentence;
  addTotal(sentences.length);

  const left: Record<string, string> = {};
  const right: Record<string, string> = {};
  [...sentences].forEach(({ '@_id': id, su: [from, to] }) => {
    // TODO: check for @lang in case they parsed in wrong order?
    left[id] = from['#text'];
    right[id] = to['#text'];
  });

  return (
    <div className="mt-2 flex border-b-2 border-dotted pb-2">
      <div className="relative w-1/2 border-r-2 border-dotted border-gray-300 pl-5 pr-2">
        <div className="absolute left-0 top-0 text-xs font-bold">{parseInt(paragraph['@_id'], 10) + 1}</div>
        {Object.entries(left).map(([key, sentence]) => (
          <div key={key} className={`s${key}`}>
            {processSentence(sentence)}
          </div>
        ))}
      </div>
      <div className="relative ml-3 w-1/2 pl-5">
        <div className="absolute left-0 top-0 text-xs font-semibold">{parseInt(paragraph['@_id'], 10) + 1}</div>
        {Object.entries(right).map(([key, sentence]) => (
          <div key={key} className={`s${key}`}>
            {processSentence(sentence)}
          </div>
        ))}
      </div>
    </div>
  );
};

export const processText = (xmlDoc: BookRoot): React.JSX.Element | null => {
  const {
    body: { section: sections },
  } = xmlDoc;
  if (!sections) return null;

  return (
    <>
      {sections.p.map((paragraph, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>{processParagraph(paragraph)}</div>
      ))}
    </>
  );
};
