import React from "react";
import { reduce, replace, isNil } from "lodash";
import ReactMarkdown from "react-markdown";

interface MarkdownComponentProps {
  className?: string,
  source: string,
  transformations?: {[id: string]: any}
}

const MarkdownComponent : React.FC<MarkdownComponentProps> =
  ({className, source, transformations}) => {
    if (transformations != null) {
      source = reduce(transformations, (currentContent, val, key) =>
        replace(currentContent, new RegExp(`{${key}}`, 'g'), isNil(val) ? '' : val),
      source);
    }

    return <ReactMarkdown className={className} source={source}  />
  }

export default MarkdownComponent;
