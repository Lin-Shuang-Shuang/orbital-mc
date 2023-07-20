import React, {useState} from "react";
import "../../pages/Style.css"
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const MarkdownReact = ({markDown, setMarkDown}) => {

    const renderers = {

      math: ({ value }) => <BlockMath>{value}</BlockMath>,
    };

    return (
        <>
            <div className = "center-div">
                <textarea
                  className="leftside"
                  value={markDown}
                  onChange = {(e) => setMarkDown(e.target.value)}>
                </textarea>
                <div className="rightside">
                  <ReactMarkdown
                  renderers={renderers}
                  children={markDown}
                  ></ReactMarkdown>
                </div>
            </div>
        </>

    );
};

export default MarkdownReact;