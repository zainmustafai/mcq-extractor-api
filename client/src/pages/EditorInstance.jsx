import React, { useState, } from 'react';
import JoditEditor from 'jodit-react';

const EditorInstance = ({ placeholder }) => {
    const [content, setContent] = useState('');

    return (
        <div>
            <div>
                <JoditEditor
                    value={content}
                    // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                />
            </div>
            <div>
                <h1>PREVIEW</h1>
                <div dangerouslySetInnerHTML={{ __html: content }}>
                </div>
            </div>
        </div>
    );
};

export default EditorInstance;