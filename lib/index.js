
const cheerio = require('cheerio');

const WebSite = (config) => {
  return {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": config.title,
    "url": config.url + config.root
  };
};

const Organization = (config) => {
  return {
    "@context": "http://schema.org",
    "@type": "Organization",
    "url": config.url + config.root,
    /*"logo": "TODO"*/
  };
};

const Parson = (config) => {
  return {
    "@context": "http://schema.org",
    "@type": "Parson",
    "name": "gazf",
    "url": config.url + config.root,
    "sameAs": [
      "https://twitter.com/gazff"
    ]
  };
};

const BlogPosting = (config, post) => {
  return {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description || cheerio(post.excerpt).text(),
    "datePublished": post.date.toISOString(),
    "dateModified": post.updated.toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": config.url + config.root + post.path
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

const BreadcrumbList = (config, post) => {
  return {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@id": config.url + config.root,
          "name": "トップページ"
        }
      }, {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@id": config.url + config.root + config.category_map[post.categories.data[0].name],
          "name": config.category_map[post.categories.data[0].name]
        }
      }, {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@id": config.url + config.root + post.path,
          "name": "このページ"
        }
      }
    ]
  };
};

module.exports = function(options) {
  const hexo = this;
  const {config, page, theme} = hexo;

  const json = [];
  json.push(WebSite(config));
  json.push(Organization(config));
  json.push(Parson(config));
  if(hexo.is_post()) {
    json.push(BlogPosting(config, page));
    json.push(BreadcrumbList(config, page));
  }

  return JSON.stringify(json);
};
