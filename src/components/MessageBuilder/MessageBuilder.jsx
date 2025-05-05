import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { BiCheckCircle, BiInfoCircle } from 'react-icons/bi'
import { BsExclamationCircle } from 'react-icons/bs'

class MessageBuilder extends Component {

    render() {

        const messageContent = this.props.messageContent;

        const errorType = this.props.errorType;
        let iconToDisplay = "";

        if (errorType === "error") {
            iconToDisplay = <BsExclamationCircle style={{ color: "#db5e56", fontSize: "35px" }} />
        }

        if (errorType === "success") {
            iconToDisplay = <BiCheckCircle style={{ color: "green", fontSize: "35px" }} />
        }

        if (errorType === "info") {
            iconToDisplay = <BiInfoCircle style={{ color: "#0275d8", fontSize: "35px" }} />
        }

        return (
            <Modal size="xl" show={this.props.showModal} onHide={() => this.props.hideMessageBuilderModal()} animation={false}>
                <Modal.Body className="text-center my-3" style={{ fontSize: "20px" }}>
                    <span style={{ fontSize: "16px" }}>
                        <div>
                            <div>
                                {iconToDisplay}
                            </div>
                            <div className="mt-4">
                                {messageContent}
                            </div>
                        </div>

                    </span>
                </Modal.Body>
                <Container>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.hideMessageBuilderModal()}>
                            Close
                            </Button>
                    </Modal.Footer>
                </Container>
            </Modal>
        )
    }

}

export default MessageBuilder;