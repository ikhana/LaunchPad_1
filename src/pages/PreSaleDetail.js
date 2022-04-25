import React, {useEffect, useState,Link} from 'react'
import styled from 'styled-components'
import {Container, Row, Col} from 'styled-bootstrap-grid'
import {Collapse} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {InvestementPreSale} from '../config/contracts/presaleInvest'
import {ethers} from 'ethers'
import {getLocal} from 'web3modal'

const PreSaleDetail = () => {
    const investementPreSale = useSelector((state) => state.auth.investementPreSale)
    

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
    const  [totalInvestedAmount, setTotalInvestment] = useState('')

    const logGet = async () => {
        if (!investementPreSale) {
            alert('you are trying to connect to a null contract')
        }

        //setDevFeeInWie(await investementPreSale.getMinDevFeeInWei())
        //const investementPreSale = new ethers.Contract(InvestementPreSale.id,InvestementPreSale.abi,signer)
        const hardCapInWei = await investementPreSale.hardCapInWei()
        const softCapInWei = await investementPreSale.softCapInWei()
        const maxInvestInWei = await investementPreSale.maxInvestInWei()
        const minInvestInWei = await investementPreSale.minInvestInWei()
        const totalCollectedWei = await investementPreSale.totalCollectedWei()
        const startTime = await investementPreSale.openTime()
        const endTime = await investementPreSale.closeTime()
        setInvesterCount(await investementPreSale.totalInvestorsCount())
  
        const startDate = new Date(startTime*1000);
        const endDate = new Date(endTime*1000);
        


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

  

        try {
            console.log('hard cap=>', hardCapInWei.toString(), 'softcap', softCapInWei.toString(), 'close Time', closeTime.toString(), 'open time', openTime.toString(), 'MaxInvest', maxInvestInWei.toString(), 'telegram bytes', telegramBytes, 'and telegram link', telegramLink, 'discordbytes', discordBytes, 'discord Link', discordLink, 'twitterBytes', twitterBytes, 'websiteBytes', websiteBytes, 'website Link', webisteLink)
        } catch (error) {
            console.log(error)
        }
    }

    const investIn = async () => {
        if (!investAmount) {
            alert('Please enter the amount for investment')
        }
        try {
            const investTx = await investementPreSale.invest({value: ethers.utils.parseEther(investAmount)})
            await investTx.wait()
        } catch (error) {
            alert(error.data.message)
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

    return (
        <Wrapper>
            <Row>
                <Column>
                    <Heading>Project</Heading>
                </Column>
            </Row>

            <Spacer />
            <Row>
                <Label lg={4}>
                    Social Profile:
                </Label>
                <Column lg={8}>

                    <a href={webisteLink}> <Icon src="/images/discord.svg" target="_blank" rel="noopener noreferrer"/></a>
                    <a href={webisteLink}> <Icon src="/images/telegram.svg" /></a>
                    <a href={webisteLink}> <Icon  src="/images/twitter.png" /></a>
                 
                    
                       
                   
                   
                   
                   
                </Column>
            </Row>
            <Spacer />
            <Row></Row>
            <Spacer />
            <Spacer />
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
            <Row>
                <Column lg={6}>
                    Opening Time:<Content>{openTime?.toString()}</Content>
                </Column>
                <Column lg={6}>
                    End Time: <Content>{closeTime?.toString()}</Content>
                </Column>
            </Row>
            <Spacer />
            {false && <>
                <Spacer />
                <Row>
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
                        <SecondButtonContainer>
                            <Button1 onClick={claimTokens}>Claim Token</Button1>
                            <Button1 onClick={logGet}>Read Info</Button1>
                        </SecondButtonContainer>
                    </Flexed>
                </Row>
                </>
            }
            
            <Spacer />
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
const SecondButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
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
    cursor:pointer;
    &:hover {
        background: #05b5cc;
    }
`
const Button1 = styled.a`
    width: 6.5rem;
    text-align: center;
    padding: 0.5rem;
    background: #00bcd4;
    color: white;
    border-radius: 0.4rem;
    border: none;
    font-size: 1rem;
    margin: 0rem 3rem 1rem 0rem;
    text-decoration: none;
    cursor:pointer;
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
    margin-left: 2rem;
`

export default PreSaleDetail
