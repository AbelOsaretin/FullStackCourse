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
  
  
  module.exports = {
    dummy, totalLikes, favouriteBlog
  }