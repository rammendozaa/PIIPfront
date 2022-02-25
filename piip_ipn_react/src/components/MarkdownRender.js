import ReactMarkdown from 'react-markdown';
/*import MathJax from 'react-mathjax';*/
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css'

function MarkdownRender(props) {
    /*const newProps = {
        ...props,
        plugins: [
          RemarkMathPlugin,
        ],
        renderers: {
          ...props.renderers,
          math: (props) => <MathJax.Node formula={props.value} />,
          inlineMath: (props) => <MathJax.Node inline formula={props.value} />
        }
      };*/
      const newProps = {
        ...props,
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [rehypeKatex],
        components: {
            math: ({value}) => <BlockMath>{value}</BlockMath>,
            inlineMath: ({value}) => <InlineMath>{value}</InlineMath>
        }
      };
      /*return (
        <MathJax.Provider input="tex">
            <ReactMarkdown {...newProps} />
        </MathJax.Provider>
      );*/
      return (
        <ReactMarkdown {...newProps} />
      );
}

export default MarkdownRender