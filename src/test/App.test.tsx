import { cleanup, render, screen } from '@testing-library/react'
import App from '../App'

describe('#App', () => {

    beforeEach(() => {
        render(<App />)
    })

    afterEach(() => {
        cleanup();
    })

    it('should have a get started button', () => {
        const getStartedBtn = screen.getByRole('button', {name: /Get Started/i})
        expect(getStartedBtn).toHaveTextContent('Get Started')
    })

    it('should have a log in button', () => {
        const dropdownMenu = screen.getByRole('button', {name: /log in/i})
        expect(dropdownMenu).toBeVisible();
    })

    it('should have an about navigation link and route to /about', () => {
        const aboutBtn = screen.getByRole('link', {name: 'About'})
        expect(aboutBtn).toBeVisible();
        expect(aboutBtn).toHaveAttribute('href')
    })
})