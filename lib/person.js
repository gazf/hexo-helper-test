
module.exports = (hexo) => {
  const {config} = hexo;
  return {
    "@context": "http://schema.org",
    "@type": "Person",
    "name": "gazf",
    "url": config.url + config.root,
    "sameAs": [
      "https://twitter.com/gazff"
    ]
  };
};
