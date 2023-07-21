import React, { useState, useEffect } from 'react';
import localAxios from '../api/Axios';
import { saveAs } from 'file-saver';
import {useNavigate, useParams} from "react-router-dom";
import {io} from 'socket.io-client';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { BlockMath, InlineMath } from 'react-katex';
import gfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';


export default function LaTex() {
    const [latex, setLatex] = useState("");
    const [latexHtml, setLatexHtml] = useState("");
    const [Title, setTitle] = useState("Welcome");
    const token = localStorage.getItem("jsontoken");
    const {id: documentId} = useParams();
    const [socket, setSocket] = useState();

    useEffect(() => {
        const s = io("http://localhost:3003", {query: {token}});
        
        s.once("title-sent-latex", document => {
          setTitle(document.title);
        })
        
        setSocket(s);
    
        return () => {
          s.disconnect()
        }
      }, [token])
    
    
      //Get or create document
      
      useEffect(() => {
        if (socket == null) return
    
        socket.once("load-latex", document => {
          setLatex(document.data);
        })
    
        socket.emit("get-latex", {documentId, Title});
      }, [socket, documentId])
      
      //Saves the document whenever changes are made
      
      useEffect(() => {
        if (socket == null || latex == null) return;
        socket.emit("save-latex", {documentId, latex});
       
      }, [socket, documentId, latex])
    
      useEffect(() => {
        if (socket == null || Title == null) return;
          socket.emit("save-latextitle", {documentId, Title})
      }, [socket, documentId, Title])

      
      
      
    const compileLatex = async () => {
        
        const response = await localAxios.get(`/api/LaTexRouter/compileToPDF/${documentId}`, { responseType: 'blob' });
        saveAs(response.data, `${Title}.pdf`);
        
      };
    
      
      


      return (
        <div>
          <input className="title-input" type="text" value={Title} onChange={e => setTitle(e.target.value)} />
          <textarea className = "textarea-latex" value={latex} onChange={e => setLatex(e.target.value)} />
          <button onClick={compileLatex}>Compile</button>
        </div>
      );
}