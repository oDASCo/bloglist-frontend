import React from 'react';

const AddBlogForm = ({
                         handleAddBlog,
                         blog,
                         hangleSetBlog,
                     }) => {
    return (
        <form onSubmit={handleAddBlog}>
            <p>Add new blog</p>
            <input
            id='blog_title'
                value={blog}
                onChange={hangleSetBlog}
            />
            <button type="submit">save</button>
        </form>
    )
}

export default AddBlogForm
