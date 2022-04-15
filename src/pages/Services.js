import React from 'react'
import styled from 'styled-components'
import {Container, Row, Col} from 'styled-bootstrap-grid'

const Services = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Heading>Services</Heading>
                </Col>
                <CustomCol lg={4}>
                    <List>
                        <Card>
                            <CardHeading>LaunchPad</CardHeading>
                            <p>The portal to help you easily update content for your launchpad.</p>
                        </Card>
                    </List>
                </CustomCol>
                <CustomCol lg={4}>
                    <List>
                        <Card>
                            <CardHeading>Liquidity Locker</CardHeading>
                            <Text>The portal to help you easily update content for your launchpad.</Text>
                        </Card>
                    </List>
                </CustomCol>
                <CustomCol lg={4}>
                    <List>
                        <Card>
                            <CardHeading>Token Mint</CardHeading>
                            <Text>The portal to help you easily update content for your launchpad.</Text>
                        </Card>
                    </List>
                </CustomCol>
                <CustomCol lg={4}>
                    <List>
                        <Card>
                            <CardHeading>NFT Market Place</CardHeading>
                            <Text>The portal to help you easily update content for your launchpad.</Text>
                        </Card>
                    </List>
                </CustomCol>
                <CustomCol lg={4}>
                    <List>
                        <Card>
                            <CardHeading>Swap</CardHeading>
                            <Text>The portal to help you easily update content for your launchpad.</Text>
                        </Card>
                    </List>
                </CustomCol>
                <CustomCol lg={4}>
                    <List>
                        <Card>
                            <CardHeading>P2E Games</CardHeading>
                            <Text>The portal to help you easily update content for your launchpad.</Text>
                        </Card>
                    </List>
                </CustomCol>
            </Row>
            <Spacer />
        </Container>
    )
}
const Heading = styled.h1`
    text-align: center;
`

const CustomCol = styled(Col)`
    padding: 0rem;
`
const List = styled.div`
    display: flex;
    margin: 1rem 0rem;
    justify-content: center;
`
const Card = styled.div`
    text-align: center;
    position: relative;
    padding: 2rem;
    background: white;
    color: black;
    border-radius: 0.2rem;
    border: none;
    font-size: 1rem;
    margin: 0rem 0.5rem;
    width: 100%;
    box-shadow: 0 0 1px rgb(0 0 0 / 17%), 0 4px 8px rgb(0 0 0 / 8%), 0 8px 12px rgb(0 0 0 / 0%), 0 12px 16px rgb(0 0 0 / 2%);
`

const CardHeading = styled.div`
    font-weight: bold;
    font-size: 1.3rem;
`
const Text = styled.p``
const Spacer = styled.div`
    height: 3rem;
`
export default Services
