import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Container, Row, Col, media} from 'styled-bootstrap-grid'
import {Collapse} from 'react-bootstrap'
import {api} from '../config/apiBaseUrl'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import PreSaleDetail from './PreSaleDetail'
import {useCountdown} from '../hooks/useCountdown'
import moment from 'moment'
import {TabList, Tab, TabPanel} from 'react-tabs'
import {ethers} from 'ethers'

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const Product = () => {
    const [activeTab, setActiveTab] = useState(1)
    const [status, setStatus] = useState('success')
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
                        <Row>
                            <STabs>
                                <STabList>
                                    <STab
                                        onClick={() => {
                                            setActiveTab(1)
                                        }}
                                        active={activeTab == 1}>
                                        Upcoming
                                    </STab>
                                    <STab
                                        onClick={() => {
                                            setActiveTab(2)
                                        }}
                                        active={activeTab == 2}>
                                        Live
                                    </STab>
                                    <STab
                                        onClick={() => {
                                            setActiveTab(3)
                                        }}
                                        active={activeTab == 3}>
                                        Completed
                                    </STab>
                                </STabList>
                                {activeTab == 1 && (
                                    <STabPanel>
                                        <TabContent>
                                            <Container>
                                                <Row>
                                                    {allProducts.map((value, index) => {
                                                        if (value.startTime != undefined) {
                                                            if (moment.unix(value.startTime).format('DD-MM-YYYY h:mm:ss A') >= moment().format('DD-MM-YYYY h:mm:ss A')) {
                                                                console.log(moment.unix(value.startTime).format('DD-MM-YYYY h:mm:ss A'))
                                                                console.log(moment().format('DD-MM-YYYY h:mm:ss A'))
                                                                debugger
                                                            }
                                                            return (
                                                                <>
                                                                    {' '}
                                                                    {moment.unix(value.startTime).format('DD-MM-YYYY h:mm:ss A') >= moment().format('DD-MM-YYYY h:mm:ss A') && (
                                                                        <Column lg={6}>
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
                                                                                    <Label> Sale Title :</Label> {value.saleTitle ? ethers.utils.parseBytes32String(value.saleTitle): '-'}
                                                                                </Content>
                                                                                <Content>
                                                                                    <Label> Creator :</Label> {value.address ? value.address: '-'}
                                                                                </Content>
                                                                                <Content>
                                                                                    <Label> Token :</Label> {value.token ? value.token:  '-'}
                                                                                </Content>
                                                                            </Card>
                                                                        </Column>
                                                                    )}{' '}
                                                                </>
                                                            )
                                                        }
                                                    })}
                                                </Row>
                                            </Container>
                                        </TabContent>
                                    </STabPanel>
                                )}

                                {activeTab == 2 && (
                                    <STabPanel>
                                        <TabContent>
                                            <Container>
                                                <Row>
                                                    {allProducts.map((value, index) => {
                                                        if (value.startTime != undefined) {
                                                            return (
                                                                <>
                                                                    {moment.unix(value.endTime).format('DD-MM-YYYY h:mm:ss A') >= moment().format('DD-MM-YYYY h:mm:ss A') && moment.unix(value.startTime).format('DD-MM-YYYY h:mm:ss A') <= moment().format('DD-MM-YYYY h:mm:ss A') && (
                                                                        <Column lg={6}>
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
                                                                                    <Label> Sale Title :</Label> {value.saleTitle ? ethers.utils.parseBytes32String(value.saleTitle) : '-'}
                                                                                </Content>
                                                                                <Content>
                                                                                    <Label> Creator :</Label> {value.address ? value.address: '-'}
                                                                                </Content>
                                                                                <Content>
                                                                                    <Label> Token :</Label> {value.token ? value.token:  '-'}
                                                                                </Content>
                                                                            </Card>
                                                                        </Column>
                                                                    )}{' '}
                                                                </>
                                                            )
                                                        }
                                                    })}
                                                </Row>
                                            </Container>
                                        </TabContent>
                                    </STabPanel>
                                )}
                                {activeTab == 3 && (
                                    <STabPanel>
                                        <TabContent>
                                            <Container>
                                                <StatusBar>
                                                    <StatusSuccess active={status == 'success'} onClick={()=>{setStatus('success')}}>Success</StatusSuccess> <StatusFaild active={status == 'faild'} onClick={()=>{setStatus('faild')}}>Faild</StatusFaild>
                                                </StatusBar>
                                                <Row>
                                                    {allProducts.map((value, index) => {
                                                        if (value.startTime != undefined) {
                                                            debugger
                                                            return (
                                                                <>
                                                                    {' '}
                                                                    {moment.unix(value.endTime).format('DD-MM-YYYY h:mm:ss A') <= moment().format('DD-MM-YYYY h:mm:ss A') && (
                                                                        <Column lg={6}>
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
                                                                                    <Label> Sale Title :</Label> {value.saleTitle ? ethers.utils.parseBytes32String(value.saleTitle) : '-'}
                                                                                </Content>
                                                                                <Content>
                                                                                    <Label> Creator :</Label> {value.address ? value.address: '-'}
                                                                                </Content>
                                                                                <Content>
                                                                                    <Label> Token :</Label> {value.token ? value.token:  '-'}
                                                                                </Content>
                                                                            </Card>
                                                                        </Column>
                                                                    )}{' '}
                                                                </>
                                                            )
                                                        }
                                                    })}
                                                </Row>
                                            </Container>
                                        </TabContent>
                                    </STabPanel>
                                )}
                            </STabs>
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
    cursor: pointer;
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

const Cover = styled.img`
    width: 100%;
    object-fit: fill;
`

const Media = styled.div`
    position: relative;
`

const STabs = styled(Tab)`
    font-size: 1.2rem;
    width: 100%;
    color: black;
    list-style: none;
`

const STabList = styled(TabList)`
    list-style-type: none;
    padding: 0.3rem;
    display: flex;
    margin: 0;
    border-bottom: 1px solid #eee;
`
STabList.tabsRole = 'TabList'

const STab = styled(Tab)`
    letter-spacing: 2px;
    width:10rem;
    margin-bottom: -5px;
    margin-left: -3px;
    text-align: center;
    padding: 0.3rem 0rem 1rem 0rem;
    user-select: none;
    cursor: arrow;
    border-bottom: ${({active}) => (active ? `0.2rem solid #00bcd4 !important` : ``)};
    font-weight ${({active}) => (active ? `bold` : ``)};
`
STab.tabsRole = 'Tab'

const STabPanel = styled.div`
    min-height: 40vh;
`

const TabContent = styled.div`
    min-height: 40vh;
    padding: 1rem;
`

STabPanel.tabsRole = 'TabPanel'

const StatusBar = styled(Row)`
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
`
const StatusButton = styled.button`
width: 7rem;
border-radius: 3rem;
padding: 0.5rem 1rem;
color: white;
font-size: 1rem;
border: 0;
cursor:pointer;
`;
const StatusSuccess = styled(StatusButton)`
    margin-right: 1rem;
    background: ${({active}) => (active ? `#07bc0c` : `#b9b6b6`)};
`
const StatusFaild = styled(StatusButton)`
background: ${({active}) => (active ? `#d80a0a` : `#b9b6b6`)};
`

export default Product
