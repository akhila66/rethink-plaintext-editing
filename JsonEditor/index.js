// import React from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import React, { useState, useEffect } from 'react';
import css from './style.css';
import TextareaAutosize from 'react-textarea-autosize';


function JsonEditor({ file, write }) {
  
  const [value, setValue] = useState('');
  
  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  // console.log(file.text())
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
      <button onClick={() => write(new File( [value],file.name, {type: file.type, lastModified : new Date()}))}> Update </button>
		</div>
	);

}




JsonEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default JsonEditor;
