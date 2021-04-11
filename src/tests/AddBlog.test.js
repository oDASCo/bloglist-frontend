import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlog from "../components/AddBlog";

test('<AddBlog /> updates parent state and calls onSubmit', () => {
    const createNote = jest.fn()

      const component = render(
        <AddBlog handleAddBlog={createNote} />
      )

      const input = component.container.querySelector('input')
      const form = component.container.querySelector('form')

      fireEvent.change(input, {
        target: { value: 'testing of forms could be easier' }
      })
      fireEvent.submit(form)

      expect(createNote.mock.calls).toHaveLength(1)
      expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier' )

})
