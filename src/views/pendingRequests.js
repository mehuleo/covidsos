import React, { Component } from 'react';
import {Card, CardBody, Badge, CardFooter, CardHeader, CardTitle, CardText, CardSubtitle, Button, Col, Container, Row} from "reactstrap";
import Header from "../components/Headers/Header.js";
import { WhatsappShareButton, WhatsappIcon, FacebookIcon, FacebookShareButton, TwitterShareButton, TwitterIcon } from 'react-share';
import {makeApiCall} from "utils/utils";
import config from 'config/config';

export default class PendingRequests extends Component {
    constructor(props){
        super(props);

        this.state = {
            requests: []
        }
    }

    componentDidMount(){
         makeApiCall(config.pendingRequests, 'GET', {}, (response) => {
             this.setState({
                 requests: (response.pending || [])
             })
         }, false);

    }

    render(){
        const { requests } = this.state;

        return (
            <>
            <Header showCards={false}/>
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row className="justify-content-center">
                <Col lg="8" md="8">
                    <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-3 py-lg-3 text-justify">
                        <div className="text-uppercase text-center mt-2 mb-2">
                            Pending Requests
                        </div>
                    </CardBody>
                    </Card>
                </Col>
                </Row>
            </Container>
            <Container className="request-card-container" fluid>
                <Row className="mt-5">
                    {
                        requests.map(({ id, heading, description, location, timestamp}) => {

                            const helpText = `Hey, someone in your area needs help. Requirement: [${heading}] Address: [${location}] If you can help, please message us on.`

                            return (
                                <Card className='request-card' key={id}>
                                    <CardBody>
                                        <CardTitle>{heading}</CardTitle>
                                        <CardText>
                                            {description}
                                        </CardText>
                                        <CardText>
                                            <b>Location -</b> <Badge color="warning">{location}</Badge><br /> 
                                            <b>Requested On -</b> <Badge color="warning">{
                                                new Intl.DateTimeFormat('en-IN', {dateStyle: 'medium', timeStyle: 'medium'})
                                                .format(new Date(timestamp))
                                            }</Badge><br />
                                        </CardText>
                                    </CardBody>
                                    <CardFooter>
                                        <span className='share-icon'>
                                                <WhatsappShareButton
                                                    url={'https://wa.me/918618948661/'}
                                                    title={helpText}
                                                >
                                                    <WhatsappIcon size={32} round />
                                                </WhatsappShareButton>
                                            </span>
                                            <span className='share-icon'>
                                                <FacebookShareButton
                                                    url={'https://wa.me/918618948661/'}
                                                    quote={helpText}
                                                >
                                                    <FacebookIcon size={32} round />
                                                </FacebookShareButton>                                        
                                            </span>
                                            <span className='share-icon'>
                                                <TwitterShareButton
                                                    url={'https://wa.me/918618948661/'}
                                                    title={helpText}
                                                >
                                                    <TwitterIcon size={32} round />
                                                </TwitterShareButton>
                                            </span>
                                    </CardFooter>
                                </Card>
                            )
                        })
                    }
                </Row>
            </Container>
            </>

        )
    }
} 