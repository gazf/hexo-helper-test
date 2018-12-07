
const WebSite = require('./website');
const Organization = require('./organization');
const Person = require('./person');
const BlogPosting = require('./blogposting');
const BreadcrumbList = require('./breadcrumblist');

module.exports = function(options) {
  const hexo = this;
  const context = [];

  context.push(WebSite(hexo));
  context.push(Organization(hexo));
  context.push(Person(hexo));
  context.push(BreadcrumbList(hexo));
  if(hexo.is_post()) {
    context.push(BlogPosting(hexo));
  }

  return JSON.stringify(context);
};
