
module.exports = (hexo) => {
  const {config, page} = hexo;

  const data = {
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
      }
    ]
  };

  if(hexo.is_category()) {
    data.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@id": page.category,
        "name": page.category
      }
    });
  }

  if(hexo.is_tag()) {
    data.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@id": page.tag,
        "name": page.tag
      }
    });
  }

  if(hexo.is_archive()) {
    data.itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@id": config.archive_dir,
        "name": config.archive_dir
      }
    });

    if(hexo.is_year()) {
      data.itemListElement.push({
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@id": page.year,
          "name": page.year
        }
      });
    }

    if(hexo.is_month()) {
      data.itemListElement.push({
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@id": page.month,
          "name": page.month
        }
      });
    }
  }

  if(hexo.is_post()) {
    page.categories.data.forEach(
      (category) => data.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@id": category.permalink,
          "name": category.name
        }
      })
    );

    data.itemListElement.push({
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@id": page.permalink,
        "name": "このページ"
      }
    });
  }

  return data;
};
