import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from "../components/Blog";

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Author test'
    }

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent('Author test');
})
test('show likes and url by clicking show btn', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Author test',
        url: 'lcsd/ss',
        likes: 34,
        user: {
            name: 'DASC',
            username: 'dasc'
        }
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog}/>
    )
    const btn = component.container.querySelector('.show-btn')

    fireEvent.click(btn)

    expect(component.container).toHaveTextContent(
        'lcsd/ss'
    )
    expect(component.container).toHaveTextContent(
        '34'
    )
})

// test('clicking the button delete calls event handler once', () => {
//     const blog = {
//         title: 'Component testing is done with react-testing-library',
//         author: 'Author test',
//         url: 'lcsd/ss',
//         likes: 34,
//         user: {
//             name: 'DASC',
//             username: 'dasc'
//         }
//     }
//     const user = {
//         username: 'dasc'
//     }
//
//     const mockHandler = jest.fn()
//
//     const component = render(
//         <Blog blog={blog} handleDeleteBlog={mockHandler}/>
//     )
//
//     const btn = component.container.querySelector('.show-btn')
//
//     fireEvent.click(btn)
//
//     const button = component.getByText('remove')
//     fireEvent.click(button)
//
//     expect(mockHandler.mock.calls).toHaveLength(1)
// })
