import React, {useEffect, useState, Link} from 'react'
import styled from 'styled-components'
import {Container, Row, Col, media} from 'styled-bootstrap-grid'
import {Collapse} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {ethers} from 'ethers'
import {getLocal} from 'web3modal'
import DateTimePicker from 'react-datetime-picker'
import {connect} from 'react-redux'
import {api} from '../config/apiBaseUrl'
import {PreSaleContract} from '../config/contracts/PreSale'
import {toast} from 'react-toastify'
import moment from 'moment'
import CountdownTimer from '../components/CountdownTimer'
import {useNavigate} from 'react-router-dom'
import {useCountdown} from '../hooks/useCountdown'
import EditPreSale from './EditPreSale'

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const PreSaleDetail = ({address, isConnected, preSaleViewToken}) => {
    const signer = useSelector((state) => state.auth.signer)
    const user = useSelector((state) => state.auth.user)
    const [editPreSale, setEditPreSale] = useState(false)
    const [hardCapInWei, setHardCapInWei] = useState()
    const [softCapInWei, setSoftCapInWei] = useState()
    const [closeTime, setCloseTime] = useState()
    const [openTime, setOpneTime] = useState()
    const [maxInvestInWei, setMaxInvestInWei] = useState('0.1')
    const [minInvestInWei, setMinInvetsInWei] = useState('0.1')
    const [telegramLink, setTelegramLink] = useState()
    const [twitterLink, setTwitterLink] = useState()
    const [discordLink, setDiscordLink] = useState()
    const [webisteLink, setWebsiteLink] = useState('')
    const [investAmount, setInvestAmount] = useState('')
    const [investerCount, setInvesterCount] = useState('')
    const [totalInvestedAmount, setTotalInvestment] = useState('')
    const [preSaleCreatorAddress, setPreSaleCreatorAddress] = useState('')
    const [isDeveloper, setIsDeveloper] = useState(false)
    const [investementPreSale, setInvestementPreSale] = useState(null)
    const [saleTitle, setSaleTitle] = useState('')
    const [tokenAddress, setTokenAddress] = useState('')
    const [liqLockAddress, setLiqLockAddress] = useState('')
    const [unsoldTokenAddress, setUnSoldTokenAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const [closingTime, setClosingTime] = useState('')
    const [startingTime, setStartingTime] = useState('')
    const [uniLiquidityAdingTime, setuniLiquidityAddingTime] = useState('')
    const [liquidityDate, setLiquidityDate] = useState('')
    const [balance, setBalance] = useState('')
    const [editCloseTime, setEditCLoseTime] = useState(new Date())
    const [editLiqTime, setEditLiqTime] = useState(new Date())
    const navigate = useNavigate()
    const preSaleStartTime = startingTime
    const saleStartingTIme = startingTime

    const [days, hours, minutes, seconds] = useCountdown(saleStartingTIme)
    const [closingTimeDays, closingTimeHours, closingTimeMinutes, closingTimeSeconds] = useCountdown(closingTime)

    useEffect(async () => {
        if (signer) {
            if (user && user.tokens.length > 0) {
                if (!preSaleViewToken) {
                    //todo..show all project
                    preSaleViewToken = user.tokens[0].token
                    setIsDeveloper(true)
                } else {
                    for (let i = 0; i < user.tokens.length; i++) {
                        if (preSaleViewToken == user.tokens[i].token) {
                            setIsDeveloper(true)
                        }
                    }
                }
            }
            const _investementPreSale = new ethers.Contract(preSaleViewToken, PreSaleContract.abi, signer)
            setInvestementPreSale(_investementPreSale)
        }
    }, [signer])

    useEffect(async () => {
        if (investementPreSale) {
            setLoading(true)
            await readLaunchpadInfo()
            setLoading(false)
        }
    }, [investementPreSale])

    const getBalance = async () => {
        try {
            const _balance = await signer.getBalance()
            /*const gasFee = await ethers.getDefaultProvider().estimateGas({
                // Wrapped ETH address
                to: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',

                // `function deposit() payable`
                data: '0xd0e30db0',

                // 1 ether
                value: ethers.utils.parseEther('0.1')
            })
            const _estimatedMaxAmount = _balance - gasFee*/

            setBalance(ethers.utils.formatEther(_balance))
            setInvestAmount(balance)

            // console.log(_estimatedMaxAmount)
        } catch (error) {
            console.log(error)
        }
    }

    const readLaunchpadInfo = async () => {
        const hardCapInWei = await investementPreSale.hardCapInWei()
        const softCapInWei = await investementPreSale.softCapInWei()
        const maxInvestInWei = await investementPreSale.maxInvestInWei()
        const minInvestInWei = await investementPreSale.minInvestInWei()
        const totalCollectedWei = await investementPreSale.totalCollectedWei()
        const startTime = await investementPreSale.openTime()
        setStartingTime(startTime * 1000)
        const endTime = await investementPreSale.closeTime()
        setClosingTime(endTime * 1000)
        const _tokenAddress = await investementPreSale.token()
        setTokenAddress(_tokenAddress)
        const presaleCreatorAddress = await investementPreSale.presaleCreatorAddress()
        setPreSaleCreatorAddress(presaleCreatorAddress)
        const liqLockAddress = await investementPreSale.LiqLockAddress()
        setLiqLockAddress(liqLockAddress)
        const unsoldTokenAddress = await investementPreSale.unsoldTokensDumpAddress()
        setUnSoldTokenAddress(unsoldTokenAddress)
        const _totalInvestorsCount = await investementPreSale.totalInvestorsCount()
        setInvesterCount(_totalInvestorsCount)

        const liquidityAddingTime = await investementPreSale.uniLiquidityAddingTime()
        setuniLiquidityAddingTime(liquidityAddingTime)

        const startDate = moment.unix(startTime).format('dddd, MMMM Do, YYYY h:mm:ss A')
        setOpneTime(startDate)
        const endDate = moment.unix(endTime).format('dddd, MMMM Do, YYYY h:mm:ss A')
        setCloseTime(endDate)
        const liquidityAddingDate = moment.unix(liquidityAddingTime).format('dddd, MMMM Do, YYYY h:mm:ss A')
        setLiquidityDate(liquidityAddingDate)

        const _hardCapInWei = ethers.utils.formatEther(hardCapInWei)
        setHardCapInWei(_hardCapInWei)
        const _softCapInWie = ethers.utils.formatEther(softCapInWei)
        setSoftCapInWei(_softCapInWie)
        const _maxInvestInWei = ethers.utils.formatEther(maxInvestInWei)
        setMaxInvestInWei(_maxInvestInWei)
        const _minInvestInWei = ethers.utils.formatEther(minInvestInWei)
        setMinInvetsInWei(_minInvestInWei)
        const _totalCollectedWei = ethers.utils.formatEther(totalCollectedWei)
        setTotalInvestment(_totalCollectedWei)

        const telegramBytes = await investementPreSale.linkTelegram()
        const twitterBytes = await investementPreSale.linkTwitter()
        const discordBytes = await investementPreSale.linkDiscord()
        const websiteBytes = await investementPreSale.linkWebsite()
        const saleTitleBytes = await investementPreSale.saleTitle()
        const _telegramLink = ethers.utils.parseBytes32String(telegramBytes)
        setTelegramLink(_telegramLink)
        const _twitterLink = ethers.utils.parseBytes32String(twitterBytes)
        setTwitterLink(_twitterLink)
        const _discordLink = ethers.utils.parseBytes32String(discordBytes)
        setDiscordLink(_discordLink)
        const _websiteLink = ethers.utils.parseBytes32String(websiteBytes)
        setWebsiteLink(_websiteLink)
        const _saleTitle = ethers.utils.parseBytes32String(saleTitleBytes)
        setSaleTitle(_saleTitle)
    }
    let updateTokensTuple = {
        maxInvestInWei: ethers.utils.parseUnits(maxInvestInWei, 18).toString(),
        minInvestInWei: ethers.utils.parseUnits(minInvestInWei, 18).toString(),
        closeTime: moment(editCloseTime).unix().toString(),
        liqAddingTime: moment(editLiqTime).unix().toString()
    }

    const investIn = async () => {
        if (!investementPreSale) {
            toast.error('Please connect your wallet first')
            if (!investAmount) {
                toast.error('Please enter the amount for investment')
            }
        }
        try {
            const investTx = await investementPreSale.invest({
                value: ethers.utils.parseEther(investAmount)
            })
            await investTx.wait()
        } catch (error) {
            if (error.data.message.includes('insufficient funds for transfer')) {
                toast.error('Your wallet doesn`t have enough funds to invest')
            } else if (error.data.message.includes('Closed')) {
                toast.error('Presale is closed')
            } else if (error.data.message.includes('Not yet opened')) {
                toast.error('Please wait. Presale is not open yet')
            } else if (error.data.message.includes('Min investment not reached')) {
                toast.error('Please check the miminmum investment requirement and enter the right amount')
            } else {
                toast.error(error.data.error)
            }
        }
    }

    const addLiquidityAndLockLPTokens = async () => {
        try {
            const addLiquidityAndLockLPTokensTx = await investementPreSale.addLiquidityAndLockLPTokens()
            await addLiquidityAndLockLPTokensTx.wait()
        } catch (error) {
            if (error.data) {
                if (error.data.message.includes('Liquidity already added')) {
                    toast.error('Liquidity already added')
                } else if (error.data.message.includes('Not whitelisted or not presale creator')) {
                    toast.error('Make sure you are adding liquidity from presale creator address')
                } else if (error.data.message.includes('Not presale creator')) {
                    toast.error('Make sure you are adding liquidity from presale creator address')
                } else if (error.data.message.includes('Not presale creator or investor')) {
                    toast.error('Only presale creator or investor can add liquidity')
                } else if (error.data.message.includes('Soft cap not reached')) {
                    toast.error('Project has not reahced to minimum investment goal')
                } else if (error.data.message.includes('Liquidity cannot be added yet')) {
                    toast.error('Can not add liquidity')
                } else {
                    toast.error('No investment made, liquidity can not be added')
                }
            }
            toast.error('Something went wrong. Please try again later.')
        }
    }

    const claimTokens = async () => {
        try {
            const claimTokens = await investementPreSale.claimTokens()
            await claimTokens.wait()
        } catch (error) {
            if (error.data) {
                if (error.data.message.includes('Not an investor.')) {
                    toast.error('Only investors are aligible to claim tokens.')
                } else {
                    toast.error(error.data.message)
                }
            }
            toast.error('Something went wrong. Please try again later.')
        }
    }

    /*const cancelAndTransferTokensToPresaleCreator = async () => {
        try {
            const cancelAndTransferTokensToPresaleCreatorTx = await investementPreSale.cancelAndTransferTokensToPresaleCreator()
            await cancelAndTransferTokensToPresaleCreatorTx.wait()
        } catch (error) {
            toast.error('Liquidity has not been added yet')
        }
    }*/

    const collectFundsRaised = async () => {
        try {
            const collectFundsRaisedTx = await investementPreSale.collectFundsRaised()
            await collectFundsRaisedTx.wait()
        } catch (error) {
            if (error.data) {
                if (error.data.message.includes('Not presale creator')) {
                    toast.error('Only presale creater can withdraw funds')
                } else if (error.data.message.includes('execution reverted')) {
                    toast.error('No funds to with draw')
                }
            } else {
                toast.error('Something went wrong. Please try again later.')
            }
        }
    }

    const getRefund = async () => {
        try {
            const getRefundTx = await investementPreSale.getRefund()
            await getRefundTx.wait()
        } catch (error) {
            if (error.data.message.includes('Not an investor')) {
                toast.error('Only investors are aligible to be refunded')
            } else {
                toast.error(error.data.message)
            }
        }
    }

    const editInfoPresale = async () => {
        try {
            const editInfoPresale = await investementPreSale.editInfoPresaleDev(updateTokensTuple.closeTime, updateTokensTuple.maxInvestInWei, updateTokensTuple.minInvestInWei, updateTokensTuple.liqAddingTime)
            const response = await editInfoPresale.wait()
            console.log(updateTokensTuple)
            if (response.data.status) {
                axios
                    .post(`${api}/pre_sale/update`, {
                        endTime: updateTokensTuple.closeTime
                    })
                    .then((response) => {
                        if (response.data.status) {
                            toast.success('Presale updated Successfully')
                            navigate('/')
                        }
                    })
                    .catch(function (error) {
                        toast.error(error.message)
                    })
            } else {
                toast.error('Something went wrong. Please try again later.')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <>
            {!editPreSale ? (
                <>
                    <Wrapper>
                        {investementPreSale && (
                            <>
                                {!isConnected && navigate('/')}
                                <Heading>
                                    {saleTitle?.toString()}
                                    <Spacer />
                                </Heading>

                                <CustomRow>
                                    {saleStartingTIme > new Date().getTime() && (
                                        <>
                                            <ColCenter lg={8}>Remaining time for Presale opening</ColCenter>
                                            <ColCenter lg={8}>
                                                <CountdownTimer targetDate={saleStartingTIme} />
                                            </ColCenter>
                                        </>
                                    )}

                                    {days + hours + minutes + seconds <= 0 && (
                                        <>
                                            {closingTimeDays + closingTimeHours + closingTimeMinutes + closingTimeSeconds >= 0 && <ColCenter>Remaining time for Presale closing </ColCenter>}
                                            <ColCenter lg={8}>
                                                <CountdownTimer targetDate={closingTime} />
                                            </ColCenter>
                                        </>
                                    )}
                                </CustomRow>
                                <Spacer />
                                <Spacer />

                                <Row>
                                    <Column lg={6}>
                                        <Text>Maximum Invest per Address (BNB):</Text>{' '}
                                        {isDeveloper && closingTimeDays + closingTimeHours + closingTimeMinutes + closingTimeSeconds >= 0 ? (
                                            <InputText
                                                style={{marginLeft: '1rem'}}
                                                width="40"
                                                type="number"
                                                min="0"
                                                pattern="\d+"
                                                value={maxInvestInWei}
                                                onChange={(e) => {
                                                    setMaxInvestInWei(e.target.value)
                                                }}
                                            />
                                        ) : (
                                            <Content>{maxInvestInWei?.toString()}</Content>
                                        )}
                                    </Column>
                                    <Column lg={6}>
                                        <Text>Minimum Invest per Address (BNB):</Text>{' '}
                                        {isDeveloper && closingTimeDays + closingTimeHours + closingTimeMinutes + closingTimeSeconds >= 0 ? (
                                            <InputText
                                                style={{marginLeft: '1rem'}}
                                                width="40"
                                                type="number"
                                                min="0"
                                                pattern="\d+"
                                                value={minInvestInWei}
                                                onChange={(e) => {
                                                    setMinInvetsInWei(e.target.value)
                                                }}
                                            />
                                        ) : (
                                            <Content>{minInvestInWei?.toString()}</Content>
                                        )}
                                    </Column>
                                </Row>
                                <Spacer />
                                <Row>
                                    <Column lg={6}>
                                        <Text>Maximum Capital (BNB):</Text> <Content>{hardCapInWei?.toString()}</Content>
                                    </Column>
                                    <Column lg={6}>
                                        <Text>Minimum Capital (BNB):</Text>
                                        <Content> {softCapInWei?.toString()}</Content>
                                    </Column>
                                </Row>
                                <Spacer />
                                <Row>
                                    <Column lg={6}>
                                        <Text>Total Investors :</Text>
                                        <Content>{investerCount?.toString()}</Content>
                                    </Column>
                                    <Column lg={6}>
                                        <Text>Total Invested Amount in BNB: </Text>
                                        <Content>{totalInvestedAmount?.toString()}</Content>
                                    </Column>
                                </Row>
                                <Spacer />
                                <Row>
                                    <Column lg={6}>
                                        <Text>Token Address :</Text>
                                        <Content>
                                            {' '}
                                            <a href={`https://testnet.bscscan.com/address/${tokenAddress}`} target="_blank" rel="noopener noreferrer" style={{color: '#2dc0cc'}}>
                                                {tokenAddress?.toString()}
                                            </a>
                                        </Content>
                                    </Column>
                                    <Column lg={6}>
                                        <Text>PreSale Creator Adress : </Text>
                                        <Content>
                                            {' '}
                                            <a href={`https://testnet.bscscan.com/address/${preSaleCreatorAddress}`} target="_blank" rel="noopener noreferrer" style={{color: '#2dc0cc'}}>
                                                {preSaleCreatorAddress?.toString()}
                                            </a>
                                        </Content>
                                    </Column>
                                </Row>
                                <Spacer />
                                <Row>
                                    <Column lg={6}>
                                        <Text>Liuidity Lock Address :</Text>
                                        <Content>
                                            {' '}
                                            <a href={`https://testnet.bscscan.com/address/${liqLockAddress}`} target="_blank" rel="noopener noreferrer" style={{color: '#2dc0cc'}}>
                                                {liqLockAddress?.toString()}
                                            </a>
                                        </Content>
                                    </Column>
                                    <Column lg={6}>
                                        <Text>Unsold Tokens Address: </Text>

                                        <Content>
                                            <a href={`https://testnet.bscscan.com/address/${unsoldTokenAddress}`} target="_blank" rel="noopener noreferrer" style={{color: '#2dc0cc'}}>
                                                {unsoldTokenAddress?.toString()}
                                            </a>
                                        </Content>
                                    </Column>
                                </Row>
                                <Spacer />
                                <Row>
                                    <Column lg={6}>
                                        <Text>Start Time:</Text>
                                        <Content>{openTime?.toString()}</Content>
                                    </Column>

                                    <Column lg={6}>
                                        <Text>End Time:</Text> <Content>{closeTime?.toString()}</Content> {isDeveloper && closingTimeDays + closingTimeHours + closingTimeMinutes + closingTimeSeconds >= 0 ? <InputDate width="40" value={editCloseTime} onChange={setEditCLoseTime} /> : <Text></Text>}
                                    </Column>

                                    <Column lg={6}>
                                        <Text>Liquidity Adding Time:</Text> <Content>{liquidityDate?.toString()}</Content>
                                        {isDeveloper && closingTimeDays + closingTimeHours + closingTimeMinutes + closingTimeSeconds >= 0 ? <InputDate width="40" value={editLiqTime} onChange={setEditLiqTime} /> : <Text></Text>}
                                    </Column>
                                </Row>
                                <Row>
                                    <Column>
                                        <Text>Social Details</Text>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column lg={12}>
                                        <a href={webisteLink} target="_blank" rel="noopener noreferrer">
                                            {' '}
                                            <Icon src="/images/website.png" />
                                        </a>
                                        <a href={discordLink} target="_blank" rel="noopener noreferrer">
                                            {' '}
                                            <Icon src="/images/discord.svg" />
                                        </a>
                                        <a href={telegramLink}>
                                            {' '}
                                            <Icon src="/images/telegram.svg" />
                                        </a>
                                        <a href={twitterLink}>
                                            {' '}
                                            <Icon src="/images/twitter.png" />
                                        </a>
                                    </Column>
                                </Row>
                                <Spacer />
                                <Row>
                                    {closingTimeDays + closingTimeHours + closingTimeMinutes + closingTimeSeconds >= 0 && days + hours + minutes + seconds <= 0 && (
                                        <>
                                            {isDeveloper == false && (
                                                <Flexed lg={10}>
                                                    <ButtonContainer>
                                                        <Button onClick={investIn}>Invest</Button>
                                                    </ButtonContainer>
                                                    <div>
                                                        <InputText
                                                            value={investAmount.toString()}
                                                            onChange={(e) => {
                                                                setInvestAmount(e.target.value)
                                                            }}
                                                        />{' '}
                                                        <MaxButton onClick={getBalance}>MAX</MaxButton>
                                                    </div>
                                                </Flexed>
                                            )}
                                            {isDeveloper && (
                                                <Flexed lg={10}>
                                                    <ButtonContainer>
                                                        <Button onClick={editInfoPresale}>Edit Presale</Button>
                                                    </ButtonContainer>
                                                </Flexed>
                                            )}
                                        </>
                                    )}
                                </Row>
                                {days + hours + minutes + seconds <= 0 && closingTimeDays + closingTimeHours + closingTimeMinutes + closingTimeSeconds <= 0 && (
                                    <>
                                        <CustomRow>
                                            <>
                                                <SecondButtonContainer lg={3}>
                                                    <Button1 onClick={addLiquidityAndLockLPTokens}>Add Liquidity</Button1>
                                                </SecondButtonContainer>
                                            </>
                                        </CustomRow>

                                        <CustomRow>
                                            {isDeveloper && (
                                                <>
                                                    <SecondButtonContainer lg={3}>
                                                        <Button1 onClick={collectFundsRaised}>Collect Funds</Button1>
                                                    </SecondButtonContainer>
                                                </>
                                            )}
                                        </CustomRow>
                                        <CustomRow>
                                            {isDeveloper == false && (
                                                <>
                                                    <SecondButtonContainer lg={3}>
                                                        <Button1 onClick={claimTokens}>Collect Token</Button1>
                                                    </SecondButtonContainer>
                                                </>
                                            )}
                                        </CustomRow>
                                        <Spacer />
                                        <Spacer />
                                    </>
                                )}

                                <Spacer />
                            </>
                        )}
                    </Wrapper>
                    {loading && (
                        <LoadingPanelContent>
                            <LoadingPanel src="/images/Preloader.gif" />
                        </LoadingPanelContent>
                    )}
                </>
            ) : (
                <EditPreSale />
            )}
        </>
    )
}

const Wrapper = styled(Container)`
    padding-top: 8rem;
`
const ButtonContainer = styled.div`
    display: flex;
    margin-left: 0rem;
    ${media.xs`
    margin-left: 0rem;
  `}
    ${media.sm`
    margin-left: 14.5rem;
  `}
    ${media.md`
    margin-left: 14.5rem;
  `}
    ${media.lg`
    margin-left: 14.5rem;
  `}
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
    align-items: baseline;
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
const Heading = styled.h3`
    text-align: center;
    position: relative;
`
const Spacer = styled.div`
    height: 1rem;
`

const InputText = styled.input`
    // outline:none;
    height: 2.4rem;
    width: ${({width}) => (width ? `${width}%` : '100%')};
    font-size: 1.1rem;
    padding: 0.4rem;
    border: 0.09rem solid #e3e2e2;
    border-radius: 0.3rem;
    box-sizing: border-box;
`

const InputDate = styled(DateTimePicker)`
    // outline:none;
    width: ${({width}) => (width ? `${width}%` : '100%')};
    font-size: 1.1rem;
    padding: 0.2rem;
    border: 0.09rem solid #e3e2e2;
    border-radius: 0.3rem;
    box-sizing: border-box;
    & div {
        border: 0rem !important;
    }
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
const MaxButton = styled.a`
    position: absolute;
    left: 36.5rem;
    text-align: center;
    padding: 0.5rem;
    font-weight: 500;
    color: #00bcd4;
    border-radius: 0.4rem;
    border: none;
    font-size: 1rem;
    text-decoration: none;
    cursor: pointer;
    align-items: center;
    ${media.xs`
    left: 22.5rem;
  `}
    ${media.sm`
    left: 22.5rem;
  `}
    ${media.md`
    left: 36.5rem;
  `}
    ${media.lg`
    left: 36.5rem;
  `}
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
const EditButton = styled.button`
    width: 25%;
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

const ColCenter = styled(Column)`
    display: flex;
    justify-content: center;
`
const Icon = styled.img`
    margin-right: 1rem;
    width: 2.5rem;
`
const LoadingPanelContent = styled.div`
    width: 100%;
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    left: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    background: #00000038;
`
const LoadingPanel = styled.img`
    width: 20%;
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    left: 0;
    margin: auto;
    top: 0;
    bottom: 0;
`

const Text = styled.span`
    font-weight: bold;
`
const Content = styled.p`
    margin-left: 0.2rem;
    font-size: 0.9rem;
`

const CustomRow = styled(Row)`
    display: flex;
    justify-content: center;
`

const CustomCol = styled(Col)`
padding: 0rem 1rem;
box - sizing: border - box;
`

const CardCol = styled(Col)`
padding: 0rem;
    &: not(: last - child)::after {
    content: '';
    position: absolute;
    top: 50 %;
    left: 11rem;
    right: -3rem;
    z - index: -1;
    border - top: 3px dotted #00bcd4;
        ${media.xs`
        left: 4rem;

      `}
        ${media.sm`
        left: 6rem;

      `}
        ${media.md`
        left: 11rem;
        right: -3rem;
      `}
}
`
const List = styled.div`
display: flex;
margin: 1rem 0rem;
justify - content: center;
    ${media.xs`
    justify-content: start;
  `}
    ${media.sm`
    justify-content: start;
  `}
    ${media.md`
    justify-content: center;
  `}
`
const Card = styled.div`
text - align: center;
position: relative;
padding: 2rem;
background: ${({active}) => (active ? '#00bcd4' : 'white')};
color: ${({active}) => (active ? 'white' : 'black')};
border - radius: 0.2rem;
border: none;
font - size: 1rem;
margin: 0rem 0.5rem;
width: 8rem;
height: 3rem;
box - shadow: 0 0 1px rgb(0 0 0 / 17 %), 0 4px 8px rgb(0 0 0 / 8 %), 0 8px 12px rgb(0 0 0 / 0 %), 0 12px 16px rgb(0 0 0 / 2 %);
    ${media.xs`
    padding: 0.5rem;
    width: 4rem;
    height: 2rem;
  `}
    ${media.sm`
    padding: 1rem;
    width: 8rem;
    height: 3rem;
  `}
    ${media.md`
    padding: 2rem;
    width: 8rem;
    height: 3rem;
  `}
`

const CardHeading = styled.div`
font - weight: bold;
font - size: 1rem;
    ${media.xs`
    font-size: 0.5rem;
  `}
    ${media.sm`
    font-size: 0.7rem;
  `}
    ${media.md`
    font-size: 1rem;
  `}
`
const FlexCenter = styled(Col)`
display: flex;
justify - content: center;
`
const Stepper = styled.ul``

const Item = styled.li`
list - style: none;
`
const StepperHead = styled.div`
display: flex;
align - items: center;
cursor: pointer;
`
const StepperBody = styled.div`
border - left: 0.2rem dotted #00bcd4;
padding: 2rem 2rem 0rem 2rem;
margin - left: 0.9rem;
`
const StepperBodyLast = styled(StepperBody)`
border - left: none;
padding: 2rem;
margin - left: 0.9rem;
display: flex;
justify - content: center;
`
const StepperFooter = styled.div`
display: flex;
margin - top: 1rem;
justify - content: flex - end;
`
const Step = styled.div`
width: 2rem;
background: #00bcd4;
height: 2rem;
display: flex;
align - items: center;
justify - content: center;
border - radius: 2rem;
color: white;
margin - right: 1rem;
cursor: pointer;
`
const Line = styled.span`
width: 2rem;
border - left: 0.2rem dotted #00bcd4;
height: 2rem;
display: flex;
margin - left: 0.9rem;
`
const Back = styled(Button)`
padding: 0.5rem 2rem!important;
font - size: 0.9rem!important;
background: #e91e63;
    &:hover {
    background: #d11555!important;
}
`
const Next = styled(Button)`
padding: 0.5rem 2rem!important;
font - size: 0.9rem!important;
`

const Label = styled.p`
margin - bottom: 0.5rem;
font - size: 0.9rem;
font - weight: bold;
`
const Select = styled.select`
width: 100 %;
height: 35px;
background: white;
color: gray;
font - size: 14px;
border: 0.09rem solid #e3e2e2;
border - radius: 0.3rem;
`

const Alblur = styled.span`
width: 100 %;
font - size: 0.8rem;
color: red;
`

const mapStateToProps = (state) => {
    return {
        address: state.auth.address,
        isConnected: state.auth.isConnected
    }
}
export default connect(mapStateToProps, null)(PreSaleDetail)
