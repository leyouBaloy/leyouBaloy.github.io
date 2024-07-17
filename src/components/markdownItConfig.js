// markdownItConfig.js
import MarkdownIt from 'markdown-it';

export const createMarkdownItInstance = () => {
  const md = new MarkdownIt();

  // Custom rule to replace <img> with <n-image>
  const defaultRender = md.renderer.rules.image || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.image = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const srcIndex = token.attrIndex('src');
    const src = token.attrs[srcIndex][1];
    const alt = token.content;

    return `<n-image width="100" src="${src}" alt="${alt}" />`;
  };

  return md;
};
