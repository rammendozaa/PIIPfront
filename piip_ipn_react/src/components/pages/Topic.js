import MarkdownRender from "../MarkdownRender";
import './Topic.css'

function Topic() {
  const markdown = `
# Graphs
You are given a tree with $N$ and a number $K$. Each node has a weight associated with it. The tree is rooted in node 1.
You have to choose $K$ disjoint subtrees such that the sum of all chosen subtrees is maximum.
See test cases for a better understanding.
Given a **formula** below
$$
s = ut + \\frac{1}{2}at^{2}
$$
x &lt; 3
\\
Some of the \textbf{greatest}

Here is a [Link](https://example.com/ "Optional link title").
\\
Calculate the value of $s$ when $u = 10\\frac{m}{s}$ and $a = 2\\frac{m}{s^{2}}$ at $t = 1s$
\\
![image info](https://www.himgs.com/imagenes/hola/comunes/hola-2017.gif)
\\
$\\sigma_U \\sim \\mathrm{Normal}(0, \\Theta_U^2)$
\\
$\\int_0^\\infty x^2 dx$
\\
$\\leq$
`
  return (
    <>
      <div className="topic-container">
        <div className="topic">
          <MarkdownRender children={markdown} />
          </div>
      </div>
    </>
  );
}

export default Topic;
