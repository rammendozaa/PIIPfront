import React, { useEffect } from "react";
import CodeEditor, { SelectionText } from "@uiw/react-textarea-code-editor";

function Prueba() {
const textRef = React.useRef();
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  useEffect(() => {
    if (textRef.current) {
      const obj = new SelectionText(textRef.current);
      console.log("obj:", obj);
    }
  }, []);
  return (
    <CodeEditor
      value={code}
      ref={textRef}
      language="js"
      placeholder="Please enter JS code."
      onChange={(evn) => setCode(evn.target.value)}
      padding={15}
      style={{
        backgroundColor: "#f5f5f5",
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        fontSize: 12
      }}
    />
  );
}
export default Prueba