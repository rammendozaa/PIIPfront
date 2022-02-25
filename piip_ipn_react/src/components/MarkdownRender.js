import ReactMarkdown from 'react-markdown';
/*import MathJax from 'react-mathjax';*/
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex'
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
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex]
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