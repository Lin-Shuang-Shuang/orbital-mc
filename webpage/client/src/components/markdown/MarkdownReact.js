import React, {useState} from "react";
import "../../pages/Style.css"
import ReactMarkdown from 'react-markdown';

const MarkdownReact = ({markDown, setMarkDown}) => {
    return (
        <>
            <div className = "center-div">
                <textarea
                  className="leftside"
                  value={markDown}
                  onChange = {(e) => setMarkDown(e.target.value)}>
                </textarea>
                <div className="rightside">
                  <ReactMarkdown>{markDown}</ReactMarkdown>
                </div>
            </div>
        </>

    );
};

export default MarkdownReact;