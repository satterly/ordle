import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the ORDLE title', () => {
  render(<App />)
  const title = screen.getByText(/O-R-D-L-E/i)
  expect(title).toBeInTheDocument()
})
