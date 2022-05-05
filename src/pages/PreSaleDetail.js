import React, {useEffect, useState, Link} from 'react'
import styled from 'styled-components'
import {Container, Row, Col} from 'styled-bootstrap-grid'
import {Collapse} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {ethers} from 'ethers'
import {getLocal} from 'web3modal'
import {connect} from 'react-redux'
import {api} from '../config/apiBaseUrl'
import {PreSaleContract} from '../config/contracts/PreSale'

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const PreSaleDetail = ({address, isConnected, preSaleViewToken}) => {
    const signer = useSelector((state) => state.auth.signer)
    const user = useSelector((state) => state.auth.user)
    const [hardCapInWei, setHardCapInWei] = useState()
    const [softCapInWei, setSoftCapInWei] = useState()
    const [closeTime, setCloseTime] = useState()
    const [openTime, setOpneTime] = useState()
    const [maxInvestInWei, setMaxInvestInWei] = useState()
    const [minInvestInWei, setMinInvetsInWei] = useState()
    const [telegramLink, setTelegramLink] = useState()
    const [twitterLink, setTwitterLink] = useState()
    const [discordLink, setDiscordLink] = useState()
    const [webisteLink, setWebsiteLink] = useState('')
    const [investAmount, setInvestAmount] = useState('')
    const [investerCount, setInvesterCount] = useState('')
    const [totalInvestedAmount, setTotalInvestment] = useState('')
    const [preSaleCreatorAddress, setPreSaleCreatorAddress] = useState('')
    const [match, setMatch] = useState(false)
    const [investementPreSale, setInvestementPreSale] = useState(null)

    useEffect(async () => {
        if (signer) {
            if (user && user.tokens.length > 0) {
                preSaleViewToken = user.tokens[0].token
                setMatch(true)
            } //todo.. if user view the page without login/or directly.. check in user tokens if match then its setmatch(true)
            const _investementPreSale = new ethers.Contract(preSaleViewToken, PreSaleContract.abi, signer)
            setInvestementPreSale(_investementPreSale)
        }
    }, [signer])

    useEffect(async () => {
        if (investementPreSale) {
            await readLaunchpadInfo()
        }
    }, [investementPreSale])

    const presaleCreatorAddress = async () => {
        const presaleCreatorAddress = await investementPreSale.presaleCreatorAddress()
        setPreSaleCreatorAddress(presaleCreatorAddress.toString())
    }

    const readLaunchpadInfo = async () => {
        const hardCapInWei = await investementPreSale.hardCapInWei()
        const softCapInWei = await investementPreSale.softCapInWei()
        const maxInvestInWei = await investementPreSale.maxInvestInWei()
        const minInvestInWei = await investementPreSale.minInvestInWei()
        const totalCollectedWei = await investementPreSale.totalCollectedWei()
        const startTime = await investementPreSale.openTime()
        const endTime = await investementPreSale.closeTime()
        const _totalInvestorsCount = await investementPreSale.totalInvestorsCount()
        setInvesterCount(_totalInvestorsCount)

        const startDate = new Date(startTime * 1000)
        const endDate = new Date(endTime * 1000)

        //todo add it in varaibles
        setHardCapInWei(ethers.utils.formatEther(hardCapInWei))
        setSoftCapInWei(ethers.utils.formatEther(softCapInWei))
        setCloseTime(endDate)
        setOpneTime(startDate)
        setMaxInvestInWei(ethers.utils.formatEther(maxInvestInWei))
        setMinInvetsInWei(ethers.utils.formatEther(minInvestInWei))
        setTotalInvestment(ethers.utils.formatEther(totalCollectedWei))

        const telegramBytes = await investementPreSale.linkTelegram()
        const twitterBytes = await investementPreSale.linkTwitter()
        const discordBytes = await investementPreSale.linkDiscord()
        const websiteBytes = await investementPreSale.linkWebsite()
        setTelegramLink(ethers.utils.parseBytes32String(telegramBytes))
        setTwitterLink(ethers.utils.parseBytes32String(twitterBytes))
        setDiscordLink(ethers.utils.parseBytes32String(discordBytes))
        setWebsiteLink(ethers.utils.parseBytes32String(websiteBytes))
    }

    const investIn = async () => {
        if (!investementPreSale) {
            alert('please connect your wallet first')
            if (!investAmount) {
                alert('Please enter the amount for investment')
            }
        }
        try {
            const investTx = await investementPreSale.invest({value: ethers.utils.parseEther(investAmount)})
            await investTx.wait()
        } catch (error) {
            alert(error.data.message)
        }
    }

    const addLiquidityAndLockLPTokens = async () => {
        try {
            const addLiquidityAndLockLPTokensTx = await investementPreSale.addLiquidityAndLockLPTokens()
            await addLiquidityAndLockLPTokensTx.wait()
        } catch (lolo) {
            alert(lolo.data.message)
        }
    }

    const claimTokens = async () => {
        try {
            const claimTokens = await investementPreSale.claimTokens()
            await claimTokens.wait()
        } catch (error) {
            alert(error.data.message)
        }
    }

    const cancelAndTransferTokensToPresaleCreator = async () => {
        try {
            const cancelAndTransferTokensToPresaleCreatorTx = await investementPreSale.cancelAndTransferTokensToPresaleCreator()
            await cancelAndTransferTokensToPresaleCreatorTx.wait()
        } catch (error) {
            alert(error.data.message)
        }
    }

    const collectFundsRaised = async () => {
        try {
            const collectFundsRaisedTx = await investementPreSale.collectFundsRaised()
            await collectFundsRaisedTx.wait()
        } catch (error) {
            alert(error.data.message)
        }
    }

    const getRefund = async () => {
        try {
            const getRefundTx = await investementPreSale.getRefund()
            await getRefundTx.wait()
        } catch (error) {
            alert(error.data.message)
        }
    }

    return (
        <Wrapper>
            <Row>
                <Column>
                    <Heading>LaunchPad Details</Heading>
                </Column>
            </Row>
            {investementPreSale && (
                <>
                    <Row>
                        <Column>
                            <Heading>PreSale Details</Heading>
                        </Column>
                    </Row>
                    <Row>
                        <Column lg={6}>
                            Maximum Invest per Address (BNB): <Content>{maxInvestInWei?.toString()}</Content>
                        </Column>
                        <Column lg={6}>
                            Minimum Invest per Address (BNB): <Content>{minInvestInWei?.toString()}</Content>
                        </Column>
                    </Row>
                    <Spacer />
                    <Row>
                        <Column lg={6}>
                            Maximum Capital (BNB): <Content>{hardCapInWei?.toString()}</Content>
                        </Column>
                        <Column lg={6}>
                            Minimum Capital (BNB):<Content> {softCapInWei?.toString()}</Content>
                        </Column>
                    </Row>
                    <Spacer />
                    <Row>
                        <Column lg={6}>
                            Total Investors :<Content>{investerCount?.toString()}</Content>
                        </Column>
                        <Column lg={6}>
                            Total Invested Amount in BNB: <Content>{totalInvestedAmount?.toString()}</Content>
                        </Column>
                    </Row>
                    <Spacer />
                    <Row>
                        <Column lg={6}>
                            Start Time:<Content>{openTime?.toString()}</Content>
                        </Column>
                        <Column lg={6}>
                            End Time: <Content>{closeTime?.toString()}</Content>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <Heading>Social Details</Heading>
                        </Column>
                    </Row>
                    <Row>
                        <Label lg={4}></Label>
                        <Column lg={8}>
                            <a href={webisteLink} target="_blank" rel="noopener noreferrer">
                                {' '}
                                <Icon src="/images/discord.svg" />
                            </a>
                            <a href={webisteLink}>
                                {' '}
                                <Icon src="/images/telegram.svg" />
                            </a>
                            <a href={webisteLink}>
                                {' '}
                                <Icon src="/images/twitter.png" />
                            </a>
                        </Column>
                    </Row>
                    <Spacer />
                    <Row>
                        {match == false && (
                            <Flexed lg={10}>
                                <ButtonContainer>
                                    <Button onClick={investIn}>Invest</Button>
                                    <InputText
                                        value={investAmount.toString()}
                                        onChange={(e) => {
                                            setInvestAmount(e.target.value)
                                        }}
                                    />
                                </ButtonContainer>
                            </Flexed>
                        )}
                        {match && (
                            <>
                                {' '}
                                <SecondButtonContainer lg={3}>
                                    <Button1 onClick={addLiquidityAndLockLPTokens}>Add Liquidity</Button1>
                                </SecondButtonContainer>
                                <SecondButtonContainer lg={3}>
                                    <Button1 onClick={cancelAndTransferTokensToPresaleCreator}>Cancel Presale</Button1>
                                </SecondButtonContainer>
                                <SecondButtonContainer lg={3}>
                                    <Button1 onClick={collectFundsRaised}>Collect Fund Raised</Button1>
                                </SecondButtonContainer>{' '}
                            </>
                        )}
                        {match == false && (
                            <>
                                <SecondButtonContainer lg={3}>
                                    <Button1 onClick={claimTokens}>Claim Token</Button1>
                                </SecondButtonContainer>
                                {/* <SecondButtonContainer lg={3}>
                                    <Button1 onClick={readLaunchpadInfo}>Read Info</Button1>
                                </SecondButtonContainer> */}
                                <SecondButtonContainer lg={3}>
                                    <Button1 onClick={getRefund}>Get Refund</Button1>
                                </SecondButtonContainer>
                                <SecondButtonContainer lg={3}>
                                    <Button1 onClick={presaleCreatorAddress}>PresaleCreater Address</Button1>
                                </SecondButtonContainer>
                                {/* <SecondButtonContainer lg={3}>
                            <Button1 onClick={apiCall}> Save</Button1>
                     </SecondButtonContainer> */}
                            </>
                        )}
                    </Row>
                    <Spacer />
                </>
            )}
        </Wrapper>
    )
}

const Wrapper = styled(Container)`
    padding-top: 8rem;
`
const ButtonContainer = styled.div`
    display: flex;
    margin-left: 14.5rem;
`
const Column = styled(Col)`
    box-sizing: border-box;
    display: flex;
    align-items: center;
`
const SecondButtonContainer = styled(Column)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
`

const Flex = styled(Column)`
    display: flex;
    align-items: center;
`

const Flexed = styled(Column)`
    display: flex;
    flex-direction: column;
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
    height: 2.4rem;
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
    padding: 0.5rem;
    background: #00bcd4;
    color: white;
    border-radius: 0.4rem;
    border: none;
    font-size: 1rem;
    margin: 0rem 1rem 1rem 0;
    text-decoration: none;
    cursor: pointer;
    &:hover {
        background: #05b5cc;
    }
`
const Button1 = styled.a`
    width: 100%;
    text-align: center;
    padding: 0.5rem;
    background: #00bcd4;
    color: white;
    border-radius: 0.4rem;
    border: none;
    font-size: 1rem;
    text-decoration: none;
    cursor: pointer;
    align-items: center;
    &:hover {
        background: #05b5cc;
    }
`

const Label = styled(Column)`
    display: flex;
    align-items: center;
`
const Icon = styled.img`
    margin-right: 1rem;
    width: 2.5rem;
`

const Text = styled.p``
const Content = styled.p`
    margin-left: 0.2rem;
    font-size: 0.9rem;
`
const mapStateToProps = (state) => {
    return {
        address: state.auth.address,
        isConnected: state.auth.isConnected
    }
}
export default connect(mapStateToProps, null)(PreSaleDetail)
