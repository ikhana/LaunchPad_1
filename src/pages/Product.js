import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Container, Row, Col} from 'styled-bootstrap-grid'
import {Collapse} from 'react-bootstrap'
import {api} from '../config/apiBaseUrl'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import PreSaleDetail from './PreSaleDetail'
import {useCountdown} from '../hooks/useCountdown'
import moment from 'moment'

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const Product = () => {
    const [allProducts, setAllProducts] = useState([])
    const [preSaleViewToken, setPreSaleViewToken] = useState('')
    const [livePreSales, setLivePreSales] = useState([])
    const [completedPreSales, setCompletedPreSales] = useState([])
    const [failesPreSales, setFailedPreSales] = useState([])
    const isConnected = useSelector((state) => state.auth.isConnected)

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

                        <Spacer />
                        <Row>
                            <Column lg={4}>
                                <NewButton disabled={true}>Upcoming</NewButton>
                            </Column>
                            <Column lg={4}>
                                <NewButton active={true}>Live</NewButton>
                            </Column>
                            <Column lg={4}>
                                <NewButton disabled={true}>Completed</NewButton>
                            </Column>
                        </Row>
                        <Spacer />
                        <Spacer />
                        <Row>
                            <Column lg={4}>
                                {allProducts.map((value, index) => {
                                    if (value.startTime != undefined) {
                                        console.log(moment.unix(value.startTime).format('dddd, MMMM Do, YYYY h:mm:ss A'))
                                        console.log(moment.unix(value.endTime).format('dddd, MMMM Do, YYYY h:mm:ss A'))
                                        return (
                                            <>
                                                {' '}
                                                {moment.unix(value.startTime).format('dddd, MMMM Do, YYYY h:mm:ss A') >= moment().format('dddd, MMMM Do, YYYY h:mm:ss A') && (
                                                    <Card
                                                        key={index + 'Upcoming'}
                                                        lg={12}
                                                        onClick={() => {
                                                            if (isConnected) {
                                                                setPreSaleViewToken(value.token)
                                                            } else {
                                                                toast.error('Please connect to wallet')
                                                            }
                                                        }}>
                                                        <Content>
                                                            <Label> Sale Title</Label> {value.saleTitle? value.saleTitle : '-'}
                                                        </Content>
                                                        <Content>
                                                            <Label> End Time</Label> {value.endTime ? moment.unix(value.endTime).format('dddd, MMMM Do, YYYY h:mm:ss A') : '-'}
                                                        </Content>
                                                        <Content>
                                                            <Label> Strat Time</Label> {value.startTime ? moment.unix(value.startTime).format('dddd, MMMM Do, YYYY h:mm:ss A') : '-'}
                                                        </Content>
                                                    </Card>
                                                )}{' '}
                                            </>
                                        )
                                    }
                                })}
                            </Column>
                            <Column lg={4}>
                                {allProducts.map((value, index) => {
                                    if (value.startTime != undefined) {
                                        return (
                                            <>
                                                {(moment.unix(value.endTime).format('dddd, MMMM Do, YYYY h:mm:ss A') >= moment().format('dddd, MMMM Do, YYYY h:mm:ss A')) && (moment.unix(value.startTime).format('dddd, MMMM Do, YYYY h:mm:ss A') <= moment().format('dddd, MMMM Do, YYYY h:mm:ss A')) && (
                                                    <Card
                                                        key={index + 'live'}
                                                        lg={12}
                                                        onClick={() => {
                                                            if (isConnected) {
                                                                setPreSaleViewToken(value.token)
                                                            } else {
                                                                toast.error('Please connect to wallet')
                                                            }
                                                        }}>
                                                        <Content>
                                                            <Label> Sale Title</Label> {value.saleTitle ? value.saleTitle : '-'}
                                                        </Content>
                                                        <Content>
                                                            <Label> End Time</Label> <span>{value.endTime ? moment.unix(value.endTime).format('dddd, MMMM Do, YYYY h:mm:ss A') : '-'} </span>
                                                        </Content>
                                                        <Content>
                                                            <Label> Strat Time</Label> <span>{value.startTime ? moment.unix(value.startTime).format('dddd, MMMM Do, YYYY h:mm:ss A') : '-'}</span>
                                                        </Content>
                                                    </Card>
                                                )}{' '}
                                            </>
                                        )
                                    }
                                })}
                            </Column>
                            <Column lg={4}>
                                {allProducts.map((value, index) => {
                                    if (value.startTime != undefined) {
                                        return (
                                            <>
                                                {' '}
                                                {moment.unix(value.endTime).format('dddd, MMMM Do, YYYY h:mm:ss A') <= moment().format('dddd, MMMM Do, YYYY h:mm:ss A') && (
                                                    <Card
                                                        key={index + 'Completed'}
                                                        lg={12}
                                                        onClick={() => {
                                                            if (isConnected) {
                                                                setPreSaleViewToken(value.token)
                                                            } else {
                                                                toast.error('Please connect to wallet')
                                                            }
                                                        }}>
                                                        <Content>
                                                            <Label> Sale Title</Label> {value.saleTitle ? value.saleTitle : '-'}
                                                        </Content>
                                                        <Content>
                                                            <Label> End Time</Label> {value.endTime ? moment.unix(value.endTime).format('dddd, MMMM Do, YYYY h:mm:ss A') : '-'}
                                                        </Content>
                                                        <Content>
                                                            <Label> Strat Time</Label> {value.startTime ? moment.unix(value.startTime).format('dddd, MMMM Do, YYYY h:mm:ss A') : '-'}
                                                        </Content>
                                                    </Card>
                                                )}{' '}
                                            </>
                                        )
                                    }
                                })}
                            </Column>
                        </Row>

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
    cursor:pointer;
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
const NewButton = styled(Button)`
    display: block;
    width: auto !important;
    margin: 0rem 0rem;
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
