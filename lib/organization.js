
module.exports = (hexo) => {
  const {config} = hexo;
  return {
    "@context": "http://schema.org",
    "@type": "Organization",
    "url": config.url + config.root,
    /*"logo": "TODO"*/
  };
};
