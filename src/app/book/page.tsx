'use client';

import { XMLParser } from 'fast-xml-parser';
import React, { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';

import type { BookRoot } from '@/app/book/AStudioBook';
import { useProgressStore } from '@/app/book/progressStore';
import { processText } from '@/libs/textProcessor';
import { Main } from '@/templates/Main';

import xmlBook from './text.xml';

const PreloadElement = ({ loadingProgress }: { loadingProgress: number }) => {
  console.log('redrawing', loadingProgress);
  return (
    <div className="mx-auto w-full rounded-md border border-blue-300 p-4 shadow">
      <div className="flex-1 animate-pulse space-y-6 py-1">
        <div className="h-2 rounded bg-slate-700" />
        <div className="h-2 rounded bg-slate-700" />
      </div>
      <div className="flex animate-pulse space-x-4">
        <div className={`max-w-[ flex-1 space-y-6 py-1${loadingProgress}%]`}>
          {loadingProgress}
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-slate-700" />
              <div className="col-span-1 h-2 rounded bg-slate-700" />
            </div>
            <div className="h-2 rounded bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Book = () => {
  const [xmlDoc, setXmlDoc] = useState<BookRoot | null>(null);
  const [parsedText, setParsedText] = useState<React.JSX.Element | null>(null);
  const { total, completed, reset } = useProgressStore();
  const [processed, setProcessed] = useState(0);
  const [test, setTest] = useState('sdfsdf');

  const progress = total ? (completed / total) * 100 : 100;
  console.log(total, completed, progress);

  const updateText = () => {
    setProcessed(0);
    reset();
    setParsedText(null);

    const options = {
      ignoreAttributes: false,
    };

    const parser = new XMLParser(options);
    const doc = parser.parse(xmlBook);
    setXmlDoc(doc.book);
  };

  useInterval(
    () => {
      // Your custom logic here
      setProcessed(processed + 1);
    },
    // Delay in milliseconds or null to stop it
    3000,
  );

  // Ensure the component re-renders when loadingProgress changes
  useEffect(() => {
    console.log('loadingProgress changed:', total, completed);
  }, [total, completed]);

  const testCall = () => {
    console.log('test call');
    setTest('bf72b3987fg298g9');
  };

  useEffect(() => {
    if (xmlDoc) {
      const text = processText(xmlDoc);
      setParsedText(text);
    }
  }, [xmlDoc]);

  return (
    <Main>
      {processed}
      <br />
      {total}
      <br />
      {completed}
      {test}
      <PreloadElement loadingProgress={completed} />
      <button onClick={updateText}>update</button>
      <button onClick={testCall}>test</button>
      {parsedText}
    </Main>
  );
};

export const dynamic = 'force-dynamic';

export default Book;
