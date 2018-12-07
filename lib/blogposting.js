
const cheerio = require('cheerio');

module.exports = (hexo) => {
  const {config, page: post} = hexo;
  return {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description || cheerio(post.excerpt).text(),
    "datePublished": post.date.toISOString(),
    "dateModified": post.updated.toISOString(),
    "articleSection": post.categories.data[0].name,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.permalink
    },    
    "author": {
      "@type": "Person",
      "name": config.author
    },
    "publisher": {
      "@type": "Organization",
      "name": config.title,
      /*"logo": {
        "@type": "ImageObject",
        "url": "",
        "width": 100,
        "height": 100
      }*/
    },
    "image": {
      "@type": "ImageObject",
      "url": config.url + config.root + post.thumbnails[0],
      "width" : "1260",
      "height" : "630"
    }
  };
};
