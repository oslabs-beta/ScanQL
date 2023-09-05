import { cleanup, render, screen } from '@testing-library/react'
import ERDView from '../components/layout/ERDView'


describe('#ERDView', () => {

    it('should render ER Diagram ', () => {
        render( <ERDView /> )
        const zoomInBtn = screen.getByLabelText('zoom in')
        expect(zoomInBtn).toBeInTheDocument(); 
        cleanup();
    })

})