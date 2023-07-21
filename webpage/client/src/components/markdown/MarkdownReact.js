import React, {useState} from "react";
import "../../pages/Style.css"
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import gfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
const MarkdownReact = ({markDown, setMarkDown}) => {

    const renderers = {
      inlineMath: ({value}) => <InlineMath math={value} />,
      math: ({value}) => <BlockMath math={value} />,
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
                  remarkPlugins = {[gfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  renderers={renderers}
                  children={markDown}
                  allowDangerousHtml
                  ></ReactMarkdown>
                </div>
            </div>
        </>

    );
};

export default MarkdownReact;