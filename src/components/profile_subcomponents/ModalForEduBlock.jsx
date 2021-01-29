import React, { PureComponent } from 'react'
import '../css/ModalForEduBlock.scss'
import {Modal, Button} from 'react-bootstrap'


export default class ModalForEduBlock extends PureComponent {
    
    render() {
        let {style, showModal, titleModal, children, save, buttonModal}=this.props
        return (
                <Modal.Dialog style={{marginTop:`${style}`}}>
                    <Modal.Header closeButton onClick={showModal}>
                        <Modal.Title>{titleModal}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {children}                        
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={showModal}>Close</Button>
                        <Button variant="primary" onClick={save}>{buttonModal}</Button>
                    </Modal.Footer>
                </Modal.Dialog>
        )
    }
}
