import React from 'react'
import styled from 'styled-components'
import {Container, Row, Col} from 'styled-bootstrap-grid'
import {useSelector} from 'react-redux'

const Admin = () => {
    const investmentFactoryContract = useSelector((state) => state.auth.investmentFactoryContract)
    return (
        <Wrapper>
            <Row>
                <Column>
                    <Heading>Admin</Heading>
                </Column>
            </Row>

            <Row>
                <Column lg={6}>Developer fee Inwei: <Content>-</Content></Column>
                <Column lg={6}>Developer fee percentage: <Content>-</Content></Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>PreSale Count: <Content>-</Content></Column>
                <Column lg={6}>PreSale Address: <Content>-</Content></Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}><Button>Owner</Button></Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Set Developer fee</Column>
                <Column lg={6}><InputText/></Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Set Developer Inwei</Column>
                <Column lg={6}><InputText/></Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Set Developer fee in Percentage</Column>
                <Column lg={6}><InputText/></Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Add PreSale</Column>
                <Column lg={6}><InputText/></Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Transfer ownership</Column>
                <Column lg={6}><InputText/></Column>
            </Row>
            <Spacer />
            <Spacer />
            <Row>
                <ButtonContent lg={12}>
                    <Button>Save</Button>
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

export default Admin
