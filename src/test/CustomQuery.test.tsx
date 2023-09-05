import { cleanup, render, screen } from '@testing-library/react'
import CustomQueryView from '../components/layout/CustomQueryView'
import userEvent from '@testing-library/user-event'

describe('#CustomQueryView', () => {

    beforeEach(() => {
        render(<CustomQueryView />)
    })

    afterEach(() => {
        cleanup();
    })

    it('should render CustomQueryView component', () => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    })


    it('should have a Submit Query button', () => {
        const submitQueryBtn = screen.getByRole('button', { name: /Submit Query/i });
        expect(submitQueryBtn).toBeInTheDocument();
        expect(submitQueryBtn).toHaveTextContent('Submit Query');
    })

    it('should display an error message when submitting an empty query', async () => {
        const submitQueryBtn = screen.getByRole('button', { name: /Submit Query/i });
        await userEvent.click(submitQueryBtn);
        expect(screen.getByText(/please provide a valid query to test/i)).toBeInTheDocument
    })
})