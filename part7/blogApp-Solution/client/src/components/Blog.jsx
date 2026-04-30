import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogs, useBlogActions } from "../stores/blogStore";
import { useUser } from "../stores/userStore";
import useNotificationStore from "../stores/notificationStore";

import NotFound from "./NotFound";

const Blog = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const blog = useBlogs().find((b) => b.id === id);
  const currentUser = useUser();
  const { likeBlog, removeBlog, addComment } = useBlogActions();
  const notify = useNotificationStore((state) => state.notify);
  const navigation = useNavigate();

  if (!blog) {
    return <NotFound />;
  }

  const canBeRemoved = () =>
    currentUser && currentUser.username === blog.user.username;

  const handleRemove = async () => {
    await removeBlog(blog);
    notify(`Blog ${blog.title} by ${blog.author} removed`);
    setConfirmOpen(false);
    navigation("/");
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await addComment(blog, comment);
    setComment("");
  };

  return (
    <Card sx={{ mt: 2, maxWidth: 600 }} className="blog">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          by {blog.author}
        </Typography>

        <Link
          href={blog.url}
          target="_blank"
          rel="noopener"
          display="block"
          sx={{ mb: 1 }}
        >
          {blog.url}
        </Link>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Added by {blog.user.name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Typography variant="body1">{blog.likes} likes</Typography>
          {currentUser && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => likeBlog(blog)}
            >
              like
            </Button>
          )}
          {canBeRemoved() && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => setConfirmOpen(true)}
            >
              remove
            </Button>
          )}
        </Box>
      </CardContent>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Remove blog</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Remove blog <strong>{blog.title}</strong> by {blog.author}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>cancel</Button>
          <Button onClick={handleRemove} color="error" variant="contained">
            remove
          </Button>
        </DialogActions>
      </Dialog>

      <CardContent>
        <Typography variant="h6">comments</Typography>
        <Box
          component="form"
          onSubmit={handleAddComment}
          sx={{ display: "flex", gap: 1, mb: 1 }}
        >
          <TextField
            size="small"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="add a comment"
          />
          <Button type="submit" variant="contained" size="small">
            add comment
          </Button>
        </Box>
        <ul>import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useBlogs, useBlogActions } from '../stores/blogStore'
import { useUser } from '../stores/userStore'
import useNotificationStore from '../stores/notificationStore'

import NotFound from './NotFound'

const Blog = () => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [comment, setComment] = useState('')
  const { id } = useParams()
  const blog = useBlogs().find((b) => b.id === id)
  const currentUser = useUser()
  const { likeBlog, removeBlog, addComment } = useBlogActions()
  const notify = useNotificationStore((state) => state.notify)
  const navigation = useNavigate()

  if (!blog) {
    return <NotFound />
  }

  const canBeRemoved = () =>
    currentUser && currentUser.username === blog.user.username

  const handleRemove = async () => {
    await removeBlog(blog)
    notify(`Blog ${blog.title} by ${blog.author} removed`)
    setConfirmOpen(false)
    navigation('/')
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    await addComment(blog, comment)
    setComment('')
  }

  return (
    <Card sx={{ mt: 2, maxWidth: 600 }} className="blog">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          by {blog.author}
        </Typography>

        <Link
          href={blog.url}
          target="_blank"
          rel="noopener"
          display="block"
          sx={{ mb: 1 }}
        >
          {blog.url}
        </Link>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Added by {blog.user.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <Typography variant="body1">{blog.likes} likes</Typography>
          {currentUser && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => likeBlog(blog)}
            >
              like
            </Button>
          )}
          {canBeRemoved() && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => setConfirmOpen(true)}
            >
              remove
            </Button>
          )}
        </Box>
      </CardContent>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Remove blog</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Remove blog <strong>{blog.title}</strong> by {blog.author}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>cancel</Button>
          <Button onClick={handleRemove} color="error" variant="contained">
            remove
          </Button>
        </DialogActions>
      </Dialog>

      <CardContent>
        <Typography variant="h6">comments</Typography>
        <Box
          component="form"
          onSubmit={handleAddComment}
          sx={{ display: 'flex', gap: 1, mb: 1 }}
        >
          <TextField
            size="small"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="add a comment"
          />
          <Button type="submit" variant="contained" size="small">
            add comment
          </Button>
        </Box>
        <ul>
          {(blog.comments || []).map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default Blog
          {(blog.comments || []).map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Blog;
