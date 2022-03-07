import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
/*import { BlockMath, InlineMath } from 'react-katex';*/
import rehypeRaw from "rehype-raw";
import 'katex/dist/katex.min.css'

function MarkdownRender(props) {
      const newProps = {
        ...props,
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [rehypeKatex, rehypeRaw],
      };
      return (
        <ReactMarkdown {...newProps} />
      );
}

export default MarkdownRender