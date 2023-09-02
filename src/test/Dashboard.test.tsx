import { cleanup, render, screen } from '@testing-library/react'
import Dashboard from '../pages/Dashboard'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('#Dashboard', () => {


    beforeEach(() => {
        render(
            <Router>
                <Routes>
                  <Route path='/' element={<Dashboard />} />
                </Routes>
            </Router>
        )
    })

    afterEach(() => {
        cleanup();
    })

    it('should have a connect to database button', () => {
        const connectDbBtn = screen.getByRole('button', { name: /Connect to a Database/i })
        expect(connectDbBtn).toHaveTextContent('Connect to a Database')
    })

    it('should not have a connect to db modal', () => {
        const connectModal = screen.queryByRole('dialog', {  name: /connect to database/i}); 
        expect(connectModal).not.toBeInTheDocument(); 
    })

    it('should open a dialog window when connect to a database is clicked', async () => {
        const connectDbBtn = screen.getByRole('button', { name: /Connect to a Database/i })
        await userEvent.click(connectDbBtn);
        const connectModal = screen.queryByRole('dialog', {  name: /connect to database/i}); 
        expect(connectModal).toBeInTheDocument(); 
        await userEvent.click(screen.getByRole('button', {  name: /close/i}))
    })

    it('should have a metrics button', () => {
        const metricsBtn = screen.getByRole('button', { name: /Metrics/i })
        expect(metricsBtn).toHaveTextContent('Metrics')
    })

    it('should have an ERD button', () => {
        const ERDBtn = screen.getByRole('button', { name: /ER Diagram/i })
        expect(ERDBtn).toHaveTextContent('ER Diagram')
    })

    it('should have a Custom Query button', () => {
        const customQueryBtn = screen.getByRole('button', { name: /Custom Query/i })
        expect(customQueryBtn).toHaveTextContent('Custom Query')
    })


    it('should have a settings icon', () => {
        const settingsBtn = screen.getByRole('button', { name: /customize options/i })
        expect(settingsBtn).toBeVisible();
    })

    it('should not have a drop down menu', () => {
        // use query instead of get when testing for something to not be there (query returns null for 0 matches, get throws an error for 0 matches)
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    })

    it('should have a drop down menu when settings icon is clicked', async () => {
        // mock resizeObserver since it's not available in testing environment.
        const ResizeObserverMock = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
        vi.stubGlobal('ResizeObserver', ResizeObserverMock);

        const settingsBtn = screen.getByRole('button', { name: /customize options/i })
        await userEvent.click(settingsBtn);
        const dropdownMenu = screen.queryByRole('menu')
        expect(dropdownMenu).toBeInTheDocument();
    })
})