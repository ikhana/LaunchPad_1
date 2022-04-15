import React from 'react'
import styled from 'styled-components'
import {Container, Row, Col} from 'styled-bootstrap-grid'
import {Collapse} from 'react-bootstrap'

const Product = () => {
    return (
        <Wrapper>
            <Row>
                <Column>
                    <Heading>Product</Heading>
                </Column>
            </Row>
            <Spacer />
            <Row>
                <FilterContent lg={12}>
                    <Button>VIP Coming </Button>
                    <Button>Live</Button>
                    <Button>Completed</Button>
                    <Button>Faild</Button>
                </FilterContent>
            </Row>
            <Spacer />
            <Spacer />
            <Row>
                <Column lg={4}>
                    <Card>Product 1</Card>
                </Column>
                <Column lg={4}>
                    <Card>Product 2</Card>
                </Column>
                <Column lg={4}>
                    <Card>Product 3</Card>
                </Column>
            </Row>
            <Spacer />
            <Spacer />
        </Wrapper>
    )
}

const Wrapper = styled(Container)`
    padding-top: 8rem;
`
const Column = styled(Col)`
    box-sizing: border-box;
`
const Flex = styled(Column)`
    display: flex;
    align-items: center;
`
const FilterContent = styled(Flex)`
    justify-content: center;
`

const Heading = styled.h1`
    text-align: center;
`
const Spacer = styled.div`
    height: 1rem;
`
const Card = styled.div`
    padding: 1rem;
    box-sizing: border-box;
    text-align: center;
    width: 100%;
    height: 12rem;
    box-shadow: 0 0 1px rgb(0 0 0 / 17%), 0 4px 8px rgb(0 0 0 / 8%), 0 8px 12px rgb(0 0 0 / 0%), 0 12px 16px rgb(0 0 0 / 2%);
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
export default Product
