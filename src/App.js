import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login";
import Notification from "./components/Notification";
import AddBlogForm from "./components/AddBlog";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [blog, setBlog] = useState('')
    const [notifMessage, setNotifMessage] = useState({
        text: '',
        type: 'general'
    });
    const [addBlogVisible, setAddBlogVisible] = useState(false)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token);
            blogService.getAll().then(blogs => {
                setBlogs(blogs.sort(compare))
            })
        }
    }, [])

    const compare = (a, b) => {
        return b.likes - a.likes;
    }

    const handleLogin = (event) => {
        event.preventDefault()
        loginService.login({username, password}).then(user => {
                window.localStorage.setItem(
                    'loggedUser', JSON.stringify(user)
                )
                setUser({username: user.username, password: user.password})
                setUsername('')
                setPassword('')
                blogService.setToken(user.token);
                blogService.getAll().then(blogs => {
                    setBlogs(blogs)
                })
                setNotifMessage({type: 'general', text: `${user.username}  successfully logged in`});
                setTimeout(() => {
                    setNotifMessage('');
                }, 3000);
            }
        ).catch(er => {
            setNotifMessage({type: 'error', text: 'login error'});
            setTimeout(() => {
                setNotifMessage('');
            }, 3000);
        })
    }

    const logout = () => {
        setUser(null)
        setBlogs([])
        window.localStorage.removeItem(
            'loggedUser'
        )
        setNotifMessage({type: 'general', text: `${user.username}  successfully logged out`});
        setTimeout(() => {
            setNotifMessage('');
        }, 3000);
    }
    const addBlog = (event) => {
        event.preventDefault()
        blogService.create({title: blog}).then(res => {
            setNotifMessage({type: 'general', text: `Blog '${blog}'  successfully added`});
            setTimeout(() => {
                setNotifMessage('');
            }, 3000);
            blogService.getAll().then(blogs => {
                setBlogs(blogs)
            })
            setAddBlogVisible(false)
            setBlog('');
        })
    }

    const onBlogDeleted = () => {
        blogService.getAll().then(blogs => {
            setBlogs(blogs)
        })
    }
    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input id='username'
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input id='password'
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit" id='login-button'>login</button>
        </form>
    )

    const addBlogForm = () => {
        const hideWhenVisible = {display: addBlogVisible ? 'none' : ''}
        const showWhenVisible = {display: addBlogVisible ? '' : 'none'}
        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={() => setAddBlogVisible(true)}>add blog</button>
                </div>
                <div style={showWhenVisible}>
                    <AddBlogForm blog={blog}
                                 hangleSetBlog={({target}) => setBlog(target.value)}
                                 handleAddBlog={addBlog}/>
                    <button onClick={() => setAddBlogVisible(false)}>cancel</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Notification message={notifMessage}/>
            {user === null ?
                loginForm() :
                <div>
                    <p>{user.username} logged-in</p>
                    <button type="submit" onClick={logout}>log out</button>
                    {addBlogForm()}
                </div>
            }
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} handleDeleteBlog={onBlogDeleted}/>
            )}
        </div>
    )
}

export default App
