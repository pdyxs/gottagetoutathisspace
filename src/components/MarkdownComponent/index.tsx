import React from "react";
import { replace, isNil, isEmpty, isNumber } from "lodash";
import ReactMarkdown from "react-markdown";

interface MarkdownComponentProps {
  className?: string,
  source: string,
  transformations?: {[id: string]: any}
}

const MarkdownComponent : React.FC<MarkdownComponentProps> =
  ({className, source, transformations}) => {
    if (transformations != null) {
      source = replace(source,
        new RegExp(/{([A-Za-z0-9_]*)}/, 'g'),
        (_full, variable) => (isEmpty(variable) || isNil(transformations[variable])) ? '' : transformations[variable]
      );

      source = replace(source,
        new RegExp(/^\|(!?)([A-Za-z0-9_]*)(([=|!=|>|<|>=|<=])([^:]*))?:(.*)$/, 'gm'),
        (_full, not, variable, _eq, comparator, comparison, line) => {
          if (!line) return _full;

          let val = transformations[variable];
          not = not === '!';

          if (isEmpty(_eq)) {
            return (val && !not) || (!val && not) ? line : '';
          }

          if (not) {
            console.log(`${_full} has invalid syntax`);
            return _full;
          }
          if (comparator === '=') {
            return (String(val) === comparison) ? line : '';
          } else if (comparator === '!=') {
            return (String(val) !== comparison) ? line : '';
          } else if (comparator === '>') {
            if (isNumber(val) && isNumber(comparison * 1)) {
              return (val > (comparison * 1)) ? line : '';
            }
            return (String(val) > comparison) ? line : '';
          } else if (comparator === '>=') {
            if (isNumber(val) && isNumber(comparison * 1)) {
              return (val >= (comparison * 1)) ? line : '';
            }
            return (String(val) >= comparison) ? line : '';
          } else if (comparator === '<') {
            if (isNumber(val) && isNumber(comparison * 1)) {
              return (val < (comparison * 1)) ? line : '';
            }
            return (String(val) < comparison) ? line : '';
          } else if (comparator === '<=') {
            if (isNumber(val) && isNumber(comparison * 1)) {
              return (val <= (comparison * 1)) ? line : '';
            }
            return (String(val) <= comparison) ? line : '';
          }
          return _full;
        });
    }

    return <ReactMarkdown className={className} source={source}  />
  }

export default MarkdownComponent;
