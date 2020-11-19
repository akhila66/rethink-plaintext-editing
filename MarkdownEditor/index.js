import PropTypes from 'prop-types';
import path from 'path';
import React, { useState, useEffect, Component } from 'react';
import css from './style.css';
import ReactMarkdown from 'react-markdown'

import ReactDOM from 'react-dom';
import styled from 'styled-components';
import '../node_modules/prismjs/themes/prism.css';
import '../node_modules/prismjs/themes/prism-okaidia.css';

import TextareaAutosize from 'react-textarea-autosize';

function MarkdownEditor({ file, write }) {

  const [value, setValue] = useState('');
 
  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);


  function BlankCodeBlock({ value }) {
    return <pre className="language-">{value || ''}</pre>;
  }
  
  function CodeBlock({ language, value }) {
    // 1. no language was typed
    // or 2. language doesnt exist
    if (!language || !Prism.languages[language] || !value)
      return <BlankCodeBlock value={value} />;
  
    var html = Prism.highlight(value, Prism.languages[language]);
    var cls = 'language-' + language;
  
    return (
      <pre className={cls}>
        <code dangerouslySetInnerHTML={{ __html: html }} className={cls} />
      </pre>
    );
  }


  return (
		<div className={css.preview}>
      <div className={css.title}>{path.basename(file.name)}</div>
			<div className={css.content}>
				<TextareaAutosize
          className={css.content}
					onChange={e => setValue(e.target.value)}
					value={value}
				/>
			</div>

			<div className={css.content}>
				<ReactMarkdown source={value} renderers={{ code: CodeBlock }} />
        <button onClick={() => write(new File( [value],file.name, {type: file.type, lastModified : new Date()}))}> Update </button>

			</div>
		</div>
	);
}


MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;

