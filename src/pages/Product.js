import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Container, Row, Col} from 'styled-bootstrap-grid'
import {Collapse} from 'react-bootstrap'
import {api} from '../config/apiBaseUrl'
import {toast} from 'react-toastify'
import PreSaleDetail from './PreSaleDetail'

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const Product = () => {
    const [allProducts, setAllProducts] = useState([])
    const [preSaleViewToken, setPreSaleViewToken] = useState('')

    useEffect(() => {
        viewAllProjects()
    }, [])

    const viewAllProjects = () => {
        axios
            .get(`${api}/user/view_all_projects`)
            .then((response) => {
                if (response.data.status) {
                    resetAllProducts()
                    response.data.data.map((data, index) => {
                        setAllProducts((preValue) => {
                            return [...preValue, data]
                        })
                    })
                }
            })
            .catch(function (error) {
                //todo..show error to user
            })
    }

    const resetAllProducts = () => {
        setAllProducts([])
    }

    return (
        <>
            {preSaleViewToken == '' ? (
                <>
                    <Wrapper>
                        <Row>
                            <Column>
                                <Heading>View All LaunchPad</Heading>
                            </Column>
                        </Row>
                        <Spacer />
                        <Row>
                            <FilterContent lg={12}>
                                <Button active={true}>Live</Button>
                                <Button disabled={true}>Completed</Button>
                                <Button disabled={true}>Faild</Button>
                            </FilterContent>
                        </Row>
                        <Spacer />
                        <Spacer />
                        <Row>
                            {allProducts.map((value, index) => {
                                return (
                                    <CustomCol
                                        key={index}
                                        lg={6}
                                        onClick={() => {
                                            setPreSaleViewToken(value.token)
                                        }}>
                                        <Card>
                                            <Content>
                                                <Label>PreSale:</Label> {value.token ? value.token : '-'}
                                            </Content>
                                            <Content>
                                                <Label>Owner:</Label> {value.address ? value.address : '-'}
                                            </Content>
                                        </Card>
                                    </CustomCol>
                                )
                            })}
                        </Row>
                        <Spacer />
                        <Spacer />
                    </Wrapper>
                </>
            ) : (
                <PreSaleDetail preSaleViewToken={preSaleViewToken} />
            )}
        </>
    )
}

const Wrapper = styled(Container)`
    padding-top: 8rem;
`
const Column = styled(Col)`
    box-sizing: border-box;
`

const CustomCol = styled(Column)`
    margin-bottom: 1rem;
    cursor: pointer;
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
    width: 100%;
    box-shadow: 0 0 1px rgb(0 0 0 / 17%), 0 4px 8px rgb(0 0 0 / 8%), 0 8px 12px rgb(0 0 0 / 0%), 0 12px 16px rgb(0 0 0 / 2%);
`
const Button = styled.a`
    width: 10rem;
    text-align: center;
    padding: 0.8rem;
    background: #00bcd4;
    background: ${({active, disabled}) => (active ? '#07bc0c' : disabled ? '#b9b6b6' : '#00bcd4')};
    color: white;
    border-radius: 0.4rem;
    border: none;
    font-size: 1rem;
    margin: 0rem 0.5rem;
    text-decoration: none;
    cursor: ${({disabled}) => (disabled ? 'no-drop' : 'pointer')};
    &:hover {
        background: ${({active, disabled}) => (active ? '#06b30b' : disabled ? '#b9b6b6' : '#00bcd4')};
    }
`

const Content = styled.span`
    display: flex;
    &:not(:last-child) {
        margin-bottom: 1rem;
    }
`

const Label = styled.span`
    font-size: 1rem;
    font-weight: bold;
    width: 6rem;
    display: block;
`
export default Product
