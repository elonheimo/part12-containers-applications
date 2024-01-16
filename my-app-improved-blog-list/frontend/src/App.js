import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import storageService from "./services/storage";

import LoginForm from "./components/LoginForm";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useNotify } from "./NotificationContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEmptyUserValue, useUserValue } from "./UserContext";

const App = () => {
  const queryClient = useQueryClient();

  const blogs = useQuery("blogs", blogService.getAll, {
    refetchOnWindowFocus: false,
  });
  const showNotification = useNotify();
  const notifyWith = (message, type = "info") => {
    showNotification(message);
  };

  console.log("blogs", blogs);
  const blogFormRef = useRef();

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData("blogs");
      queryClient.setQueryData("blogs", notes.concat(newNote));
    },
  });
  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });
  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });
  const emptyUser = useEmptyUserValue()
  const logout = async () => {
    emptyUser()
    notifyWith("logged out");
  };

  const createBlog = async (newBlog) => {
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
    newBlogMutation.mutate(newBlog);
    blogFormRef.current.toggleVisibility();
  };

  const like = async (blog) => {
    updateBlogMutation.mutate({
      ...blog,
      likes: blog.likes + 1,
    });
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`);
  };

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    );
    if (ok) {
      removeBlogMutation.mutate(blog.id);
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
    }
  };
  const user = useUserValue()
  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <p>bakkari {JSON.stringify(process.env)}</p>
        <Notification />
        <LoginForm />
      </div>
    );
  }
  const byLikes = (b1, b2) => b2.likes - b1.likes;
  if (blogs.isLoading) {
    return <div>loading data...</div>;
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.data.sort(byLikes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
