import { useNavigate } from "react-router-dom";
import { useBlogActions } from "../stores/blogStore";
import useNotificationStore from "../stores/notificationStore";
import useField from "../hooks/useField";

import { TextField, Button, Stack } from "@mui/material";

const BlogForm = () => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");
  const { addBlog } = useBlogActions();
  const notify = useNotificationStore((state) => state.notify);
  const navigation = useNavigate();

  const handleCreateNew = async (event) => {
    event.preventDefault();
    try {
      const createdBlog = await addBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      });
      notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`);
      navigation("/");
    } catch (error) {
      console.log("Creating new blog failed:", error);
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <TextField label="title" size="small" {...title} />
          <TextField label="author" size="small" {...author} />
          <TextField label="url" size="small" {...url} />
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: "flex-start" }}
          >
            create
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default BlogForm;
