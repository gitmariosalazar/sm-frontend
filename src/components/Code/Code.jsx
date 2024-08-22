import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyAllOutlined } from "@mui/icons-material";

const Code = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Mensaje de copiado desaparece después de 2 segundos
  };
  return (
    <div style={{ position: "relative", width: "100%", display: "flex" }}>
      <CopyToClipboard text={code} onCopy={handleCopy}>
        <button
          style={{ position: "absolute", top: "10px", right: "10px" }}
          title="Copy"
        >
          {copied ? "Copied!" : <CopyAllOutlined />}
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        customStyle={{ width: "100%", whiteSpace: "pre-wrap" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
export default Code;
