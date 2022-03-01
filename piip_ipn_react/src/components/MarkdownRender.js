import ReactMarkdown from 'react-markdown';
import MathJax from 'react-mathjax';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import { BlockMath, InlineMath } from 'react-katex';
import rehypeRaw from "rehype-raw";
import 'katex/dist/katex.min.css'

function MarkdownRender(props) {
      const newProps = {
        ...props,
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [rehypeKatex, rehypeRaw],
      };
      return (
        <MathJax.Provider input="tex">
            <ReactMarkdown {...newProps} />
        </MathJax.Provider>
      );
}

export default MarkdownRender