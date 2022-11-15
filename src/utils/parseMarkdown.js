export const parseMarkdown = (text) => {
  //ul
  text = text.replace(/^\s*\n\*/gm, "<ul>\n*");
  text = text.replace(/^(\*.+)\s*\n([^\*])/gm, "$1\n</ul>\n\n$2");
  text = text.replace(/^\*(.+)/gm, "<li>$1</li>");

  //ol
  text = text.replace(/^\s*\n\d\./gm, "<ol>\n1.");
  text = text.replace(/^(\d\..+)\s*\n([^\d\.])/gm, "$1\n</ol>\n\n$2");
  text = text.replace(/^\d\.(.+)/gm, "<li>$1</li>");

  //blockquote
  text = text.replace(/^\>(.+)/gm, "<blockquote>$1</blockquote>");

  //h
  text = text.replace(/[\#]{6}(.+)/g, "<h6>$1</h6>");
  text = text.replace(/[\#]{5}(.+)/g, "<h5>$1</h5>");
  text = text.replace(/[\#]{4}(.+)/g, "<h4>$1</h4>");
  text = text.replace(/[\#]{3}(.+)/g, "<h3>$1</h3>");
  text = text.replace(/[\#]{2}(.+)/g, "<h2>$1</h2>");
  text = text.replace(/[\#]{1}(.+)/g, "<h1>$1</h1>");

  //alt h
  text = text.replace(/^(.+)\n\=+/gm, "<h1>$1</h1>");
  text = text.replace(/^(.+)\n\-+/gm, "<h2>$1</h2>");

  //images
  text = text.replace(
    /\!\[([^\]]+)\]\(([^\)]+)\)/g,
    '<img src="$2" alt="$1" />'
  );

  //links
  text = text.replace(
    /[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g,
    '<a href="$2" title="$4">$1</a>'
  );

  //font styles
  text = text.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, "<b>$1</b>");
  text = text.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, "<i>$1</i>");
  text = text.replace(/[\~]{2}([^\~]+)[\~]{2}/g, "<del>$1</del>");

  //pre
  text = text.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
  text = text.replace(/^\`\`\`\s*\n/gm, "</pre>\n\n");

  //code
  text = text.replace(/[\`]{1}([^\`]+)[\`]{1}/g, "<code>$1</code>");

  //p
  text = text.replace(/^\s*(\n)?(.+)/gm, function (m) {
    return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m)
      ? m
      : "<p>" + m + "</p>";
  });

  //strip p from pre
  text = text.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, "$1$2");

  return text;
};
