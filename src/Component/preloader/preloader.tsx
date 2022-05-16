import React from 'react';
import {Col, Preloader, Row} from 'react-materialize';
import './css/style.css';

export const PreloaderComponent = (): JSX.Element => {
    return (
        <div>
            <Row>
                <div className=''>
                    <Col s={4}>
                        <Preloader
                            active
                            color="blue"
                            flashing
                        />
                    </Col>
                </div>
            </Row>
        </div>
    )
}