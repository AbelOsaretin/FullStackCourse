const _ = require('lodash');

const dummy = (blogs) => {
    return 1
  }

  const totalLikes = blogs => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }

  const favouriteBlog = (blogs) => {  
    return blogs.reduce((favorite, blog) => {
      return (blog.likes > favorite.likes) ? blog : favorite;
    });
  };

  

  const mostBlogs = (blogs) => {
  
    const authorCounts = _.countBy(blogs, 'author');
  
    const topAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author]);
  
    return {
      author: topAuthor,
      blogs: authorCounts[topAuthor],
    };
  };
  
  module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs
  }