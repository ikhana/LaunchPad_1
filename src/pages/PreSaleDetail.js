import React from 'react'
import styled from 'styled-components'
import {Container, Row, Col} from 'styled-bootstrap-grid'
import {Collapse} from 'react-bootstrap'

const PreSaleDetail = () => {
    return (
        <Wrapper>
            <Row>
                <Column>
                    <Heading>Project</Heading>
                </Column>
            </Row>
            <Row>
                <Column lg={4}>
                    <Logo />
                </Column>
                <Flex lg={8}>
                    <Text>Discription as Submitted</Text>
                </Flex>
            </Row>
            <Spacer />
            <Row>
                <Label lg={4}>Social Profile</Label>
                <Column lg={8}>
                    <Icon src="/images/discord.svg"/>
                    <Icon src="/images/telegram.svg"/>
                    <Icon src="/images/twitter.png"/>
                </Column>
            </Row>
            <Spacer />
            <Row>
                <Label lg={4}>Audi</Label>
                <Column lg={8}>
                    <InputText />
                </Column>
            </Row>
            <Spacer />
            <Row>
                <Label lg={4}>KYC</Label>
                <Column lg={8}>
                    <InputText />
                </Column>
            </Row>
            <Spacer />
            <Spacer />
            <Row>
                <Column>
                    <Heading>PreSale Details</Heading>
                </Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Hard Cap: <Content>-</Content></Column>
                <Column lg={6}>Soft Cap: <Content>-</Content></Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Maximum Invest per Address: <Content>-</Content></Column>
                <Column lg={6}>Minimum Invest per Address: <Content>-</Content></Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Maximum Capital <Content>-</Content></Column>
                <Column lg={6}>Minimum Capital <Content>-</Content></Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Start Time <Content>-</Content></Column>
                <Column lg={6}>End Time <Content>-</Content></Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}> <InputText /> <Button>Invest</Button></Column>
                <Column lg={6}></Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={8}>Tokenomics:</Column>
                <Column lg={4}>
                    {' '}
                    <Logo />
                </Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={12}>Liquidty Lock:</Column>
            </Row>
            <Spacer />
            <Row>
                <Label lg={4}>Token Vesting:</Label>
                <Column lg={8}>
                    <InputText />
                </Column>
            </Row>
            <Spacer />
            <Spacer />
            <Row>
                <ButtonContent lg={12}>
                    <Button>Cont ... </Button>
                    <Button>Claim Token</Button>
                </ButtonContent>
            </Row>
            <Spacer />
        </Wrapper>
    )
}

const Wrapper = styled(Container)`
    padding-top: 8rem;
`
const Column = styled(Col)`
    box-sizing: border-box;
    display: flex;
    align-items: center;
`
const Flex = styled(Column)`
    display: flex;
    align-items: center;
`
const ButtonContent = styled(Flex)`
    justify-content: center;
`

const Logo = styled.img`
    width: 8rem;
    height: 8rem;
    border-radius: 5rem;
    border: 1px solid #eee;
`
const Heading = styled.h1`
    text-align: center;
`
const Spacer = styled.div`
    height: 1rem;
`

const InputText = styled.input`
    // outline:none;
    width: 100%;
    font-size: 1.1rem;
    padding: 0.4rem;
    border: 0.09rem solid #e3e2e2;
    border-radius: 0.3rem;
    box-sizing: border-box;
`
const Button = styled.a`
    width: 10rem;
    text-align: center;
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

const Label = styled(Column)`
display:flex;
align-items:center;
`
const Icon = styled.img` 
margin-right:1rem;
width:2.5rem;`

const Text = styled.p``
const Content = styled.p`
margin-left:2rem;
`

export default PreSaleDetail
