import React, {useState} from 'react'
import styled from 'styled-components'
import {Container, Row, Col} from 'styled-bootstrap-grid'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
import {ethers} from 'ethers'
import CreateToken from '../pages/CreateToken'
import {investmentFactoryContract} from '../config/contracts/InvestmentsFactory'
import { InvestementInfo } from '../config/contracts/InvetmentInfo'
import { InvestementPreSale } from '../config/contracts/presaleInvest'
import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import {setConnected, setDisconnected } from '../actions/authActions'

const Header = (props) => {
    const [open, setOpen] = useState(false)
    //get it via connector
    const [isConnected, setIsConnected] = useState(false)

    const closeModel = () => {
        setOpen(false)
    }

    const openModel = () => {
        setOpen(true)
    }

    const handleDisconnect = async () => {
        setIsConnected(false)
        props.setDisconnected()
    }

    const handleConnect = async () => {
        try {
            const {default: MewConnectImport} = await import('@myetherwallet/mewconnect-web-client')
            const infuraId = 'e7218ebfa4cd4b65bd3d4c5a508f03a8'
            const providerOptions = {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        infuraId
                    }
                },
                mewconnect: {
                    package: MewConnectImport,
                    options: {
                        infuraId
                    }
                },
                'custom-coinbase': {
                    display: {
                        logo: '/images/coinbase_wallet.png',
                        name: 'Coinbase',
                        description: 'Scan with WalletLink to connect'
                    },
                    package: WalletLink,
                    options: {
                        appName: 'Launchpad',
                        networkUrl: `https://mainnet.infura.io/v3/${infuraId}`,
                        chainId: 1
                    },
                    connector: async (_, options) => {
                        const {appName, networkUrl, chainId} = options
                        const walletLink = new WalletLink({
                            appName
                        })
                        const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
                        await provider.enable()
                        return provider
                    }
                }
            }
            const web3Modal = new Web3Modal({
                network: 'mainnet',
                cacheProvider: true,
                providerOptions
            })

            const web3 = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(web3)
            const signer = provider.getSigner()
            const address = await signer.getAddress()

            const chainId = await signer.getChainId()

            const investmentFactoryContract1 = new ethers.Contract(investmentFactoryContract.id, investmentFactoryContract.abi, signer )
            const investmentInfoRead = new ethers.Contract( InvestementInfo.id,InvestementInfo.abi, signer)
            const investementPreSale = new ethers.Contract(InvestementPreSale.id,InvestementPreSale.abi,signer)

           // const   hardCapInWei = await investementPreSale.hardCapInWei()

          /*  try {
                console.log('first Read from the investment contract =>',  hardCapInWei.toString() )
                
            } catch (error) {
                console.log(error)
                
            }*/
       // console.log(investmentFactoryRead.address)
       if (chainId.toString() == '97') {
                const isConnected = Boolean(provider && signer)
                const chainError = false
                setIsConnected(isConnected)

                props.setConnected({
                    isConnected: isConnected,
                    chainError: false,
                    address: address,
                    investmentFactoryContract1: investmentFactoryContract1,
                    investmentInfoRead: investmentInfoRead,
                    investementPreSale : investementPreSale 
                })

                web3.on('accountsChanged', (accounts) => {
                    handleDisconnect()
                })

                web3.on('chainChanged', (chainId) => {
                    handleDisconnect()
                })

                web3.on('disconnect', (error) => {
                    handleDisconnect()
                })
            } else {
                alert('Please connect to chain id 97')
                props.setConnected({
                    isConnected: false,
                    chainError: true
                })
            }
        } catch (error) {
            console.log('error', error)
            props.setConnected({
                isConnected: false,
                chainError: true
            })
        }
    }

    return (
        <>
            <Main
                fluid
                styled={{
                    boxShadow: '0 0 1px rgb(0 0 0 / 17%), 0 4px 8px rgb(0 0 0 / 8%), 0 8px 12px rgb(0 0 0 / 0%), 0 12px 16px rgb(0 0 0 / 2%)'
                }}>
                <Nav>
                    <Wrapper>
                        <LogoContent>
                            <Logo src="/images/logo.png" />
                        </LogoContent>
                    </Wrapper>
                    <Col>
                        <NavBar>
                            <List></List>
                        </NavBar>
                    </Col>
                    <FlexRight>
                        <Button onClick={() => openModel()}>Create Token</Button>
                     <Button onClick={() => (!isConnected ? handleConnect() : handleDisconnect())}>{!isConnected ? 'Connect' : 'Disconnect'}</Button>
                    </FlexRight>
                </Nav>
            </Main>
            <CreateToken open={open} closeModel={closeModel} />
        </>
    )
}

const Main = styled(Container)`
    box-shadow: 0 0 1px rgb(0 0 0 / 17%), 0 4px 8px rgb(0 0 0 / 8%), 0 8px 12px rgb(0 0 0 / 0%), 0 12px 16px rgb(0 0 0 / 2%);
    position: fixed;
    background: white;
    z-index: 2;
`

const Nav = styled(Row)`
    align-items: center;
    height: 5rem;
    padding: 0rem 3rem 0rem 3rem;
`

const Wrapper = styled.div`
    position: absolute;
`
const FlexRight = styled(Wrapper)`
    position: absolute;
    right: 4%;
`
const LogoContent = styled.div`
    padding: 0rem;
`
const Logo = styled.img`
    width: 14rem;
    padding: 0rem;
`
const NavBar = styled.div`
    width: 100%;
`

const List = styled.h1`
    margin: 0rem;
    text-align: center;
`
const Button = styled.div`
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #00bcd4;
    color: white;
    border-radius: 0.3rem;
    border: none;
    font-size: 0.7rem;
    text-align: center;
    margin: 0rem 0.5rem;
    cursor:pointer;
    &:hover {
        background: #05b5cc;
    }
`

const mapStateToProps = (state) => {
    return {
        // shouldConnect: state.auth.shouldConnect,
        // isConnected: state.auth.isConnected
    }
}

const mapDispatchToProps = (dispatch) => ({
    setConnected: (data) => dispatch(setConnected(data)),
    setDisconnected: (data) => dispatch(setDisconnected(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
