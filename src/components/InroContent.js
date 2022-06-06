import React from 'react'
import styled from 'styled-components'
import {Container, Row, Col} from 'styled-bootstrap-grid'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const IntroContent = ({user}) => {
    return (
        <Wrapper>
            <Spacer />
            <Row>
                <Col lg={8} offset={2}>
                    <Heading>The Launchpad Protocol for Everyone!</Heading>
                    <Content>LaunchPad helps everyone to create their own tokens and token sales in few seconds. Tokens created on LaunchPad will be verified and published on explorer websites.</Content>
                </Col>
                <Col lg={8} offset={2}>
                    <Flex>
                        {user?.tokens?.length > 0 ? (
                            <Linking to="/viewLaunchPad">
                                <Button>View your LaunchPad</Button>
                            </Linking>
                        ) : (
                            <Linking to="/createLaunchPad">
                                <Button>Create your LaunchPad</Button>
                            </Linking>
                        )}
                        <Linking to="/viewAllLaunchPad">
                            <Button>Checkout Projects</Button>
                        </Linking>
                    </Flex>
                </Col>
            
            </Row>
            <Spacer />
            <Row>
                <Col>
                    <Heading>Available Chains</Heading>
                    <List>
                        <ChainList>
                            <CardHeading>BSC</CardHeading>
                        </ChainList>
                        <ChainList>
                            <CardHeading>ERC</CardHeading>
                            <br />
                            <Tag>Comming soon</Tag>
                        </ChainList>
                        <ChainList>
                            <CardHeading>POLYGON</CardHeading>
                            <br />
                            <Tag>Comming soon</Tag>
                        </ChainList>
                        <ChainList>
                            <CardHeading>FANTOM</CardHeading>
                        </ChainList>
                    </List>
                </Col>
            </Row>
            <Spacer />
        </Wrapper>
    )
}
const Wrapper = styled(Container)`
    padding-top: 5rem;
`

const Heading = styled.h1`
    text-align: center;
`
const Content = styled.p`
    font-size: 1.2rem;
    line-height: 1.5;
    text-align: center;
`
const Flex = styled.div`
    text-align: center;
    margin: 1rem 0rem;
`
const List = styled.div`
    display: flex;
    margin: 2rem 0rem;
    justify-content: center;
`
const ChainList = styled.div`
    text-align: center;
    position: relative;
    padding: 2rem;
    background: white;
    color: black;
    border-radius: 0.2rem;
    border: none;
    font-size: 1rem;
    margin: 0rem 0.5rem;
    width: 11rem;
    height: 3rem;
    box-shadow: 0 0 1px rgb(0 0 0 / 17%), 0 4px 8px rgb(0 0 0 / 8%), 0 8px 12px rgb(0 0 0 / 0%), 0 12px 16px rgb(0 0 0 / 2%);
`
const Button = styled.a`
    text-decoration: none;
    padding: 0.8rem;
    background: #00bcd4;
    color: white;
    border-radius: 0.4rem;
    border: none;
    font-size: 1rem;
    margin: 0rem 0.5rem;
    text-decoration: none;
    &:hover {
        background: #05b5cc;
    }
`
const CardHeading = styled.div`
    font-weight: bold;
    font-size: 1.3rem;
`

const Tag = styled.div`
    position: absolute;
    font-size: 0.9rem;
    color: #00bcd4;
    bottom: 1rem;
    right: 0;
    left: 0;
`
const Spacer = styled.div`
    height: 3rem;
`

const Linking = styled(Link)`
    text-decoration: none;
`
const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToProps, null)(IntroContent)
