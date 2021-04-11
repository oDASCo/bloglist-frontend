import React, {useState} from 'react'
import blogService from "../services/blogs";
import PropTypes from 'prop-types'

const Blog = ({blog, handleDeleteBlog}) => {
    const [blogVisible, setBlogVisible] = useState(false)
    const [blogLikes, setBlogLikes] = useState(blog.likes)

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    let user;
    if (loggedUserJSON) {
        user = JSON.parse(loggedUserJSON)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const addLikes = () => {
        setBlogLikes(blogLikes + 1);
        const updatedBlog = {
            user: blog.user.id,
            likes: blogLikes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }
        blogService.update(updatedBlog, blog.id).then(res => {
            console.log(res);
        });
    }

    const deleteBlog = () => {
        blogService.deleteBlog(blog.id).then(res => {
            console.log(res);
            handleDeleteBlog();
        });
    }

    return (
        <div style={blogStyle} className='blog'>
            <div>
                {blog.title} {blog.author}
                <button className='show-btn' onClick={() => setBlogVisible(!blogVisible)}>{blogVisible ? 'hide' : 'show'}</button>
            </div>
            {blogVisible ? <div>
                <p>{blog.url}</p>
                <div>likes: {blogLikes}
                    <button onClick={addLikes}>like</button>
                </div>
                <p>{blog.user.name}</p>
                {user?.username === blog.user.username ? <button className='remove' onClick={deleteBlog}>remove</button> : ''}
            </div> : ''}
        </div>
    )
}

Blog.propTypes = {
    //handleDeleteBlog: PropTypes.func.isRequired,
}


export default Blog
