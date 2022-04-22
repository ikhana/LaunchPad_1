import React, { useState } from 'react'
import styled from 'styled-components'
import {Container, Row, Col} from 'styled-bootstrap-grid'
import {Collapse} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { InvestementPreSale } from '../config/contracts/presaleInvest'
import { ethers } from 'ethers'

const PreSaleDetail = () => {

    const investementPreSale = useSelector(
        (state) => state.auth.investementPreSale,
      )

      const [hardCapInWei,setHardCapInWei] =useState();
      const [softCapInWei,setSoftCapInWei] = useState()
      const [closeTime, setCloseTime] = useState()
      const [openTime, setOpneTime] = useState()
      const [maxInvestInWei,setMaxInvestInWei] = useState()
      const [minInvestInWei, setMinInvetsInWei] = useState();
      const [telegramLink, setTelegramLink] = useState();
      const [twitterLink, setTwitterLink] = useState();
      const [discordLink, setDiscordLink] = useState();
      const [webisteLink, setWebsiteLink] = useState();
     








      const logGet = async () => {
        if (!investementPreSale) {
          alert('you are trying to connect to a null contract')
        }
    
       
        //setDevFeeInWie(await investementPreSale.getMinDevFeeInWei())
        //const investementPreSale = new ethers.Contract(InvestementPreSale.id,InvestementPreSale.abi,signer)

     setHardCapInWei(await investementPreSale.hardCapInWei())
     setSoftCapInWei(await investementPreSale.softCapInWei())
     setCloseTime(await investementPreSale.closeTime())
     setOpneTime(await investementPreSale.openTime())
     setMaxInvestInWei(  await investementPreSale.maxInvestInWei())
     setMinInvetsInWei(  await investementPreSale.minInvestInWei())

     const telegramBytes = await investementPreSale.linkTelegram();
     const twitterBytes = await investementPreSale.linkTwitter();
     const discordBytes = await investementPreSale.linkDiscord();
     const websiteBytes = await investementPreSale.linkWebsite();
     setTelegramLink(ethers.utils.parseBytes32String(telegramBytes))
     setTwitterLink(ethers.utils.parseBytes32String(twitterBytes))
     setDiscordLink(ethers.utils.parseBytes32String(discordBytes))
     setWebsiteLink(ethers.utils.parseBytes32String(websiteBytes))

    
       

     
      /*setSoicalProfile(/*socialProfile.telegramLink = await investementPreSale.linkTelegram(),
      ethers.utils.parseBytes32String(bytes32),
      socialProfile.TwitterLink = await ethers.utils.parseBytes32String(investementPreSale.) ,
      socialProfile.discordLink= await investementPreSale.linkDiscord(),
      socialProfile.websiteLink = await investementPreSale.linkWebsite()
      )*/
     

      

        try {
           
            console.log('hard cap=>',  hardCapInWei.toString() ,"softcap", softCapInWei.toString(), "close Time", closeTime.toString(),
             "open time", openTime.toString(), "MaxInvest", maxInvestInWei.toString(),
              'telegram bytes', telegramBytes ,
               'and telegram link', telegramLink,
               "discordbytes" , discordBytes,
               "discord Link", discordLink,
               "twitterBytes", twitterBytes,
               "websiteBytes", websiteBytes,
               "website Link", webisteLink


             
             )
            
        } catch (error) {
            console.log(error)
            
        }
        
        
    
      }

      const investIn = async () => {const investTx = await investementPreSale.invest();await investTx.wait();}
      const claimTokens = async () =>{ const claimTokens = await investementPreSale.claimTokens();  await claimTokens.wait()}

      
    return (
        <Wrapper>
            <Row>
                <Column>
                    <Heading>Project</Heading>
                </Column>
            </Row>
            <Row>
              
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
                <Label lg={4}>Audit</Label>
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
           
            <Row>
                <Column lg={6}>Maximum Invest per Address: <Content>{maxInvestInWei?.toString()}</Content></Column>
                <Column lg={6}>Minimum Invest per Address: <Content>{minInvestInWei?.toString()}</Content></Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Maximum Capital: <Content>{hardCapInWei?.toString()}</Content></Column>
                <Column lg={6}>Minimum Capital:<Content> {softCapInWei?.toString()}</Content></Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Start Time:<Content>{openTime?.toString()}</Content></Column>
                <Column lg={6}>End Time: <Content>{closeTime?.toString()}</Content></Column>
            </Row>
            <Spacer />
            <Row>
                <Flexed lg={12}> 
                <Button onClick={investIn}>Invest</Button>
                <Button onClick={claimTokens}>Claim Token</Button>
                <Button onClick={logGet}>Read Info</Button>
                </Flexed>
                
               
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

const Flexed = styled(Column)`
display: flex;
justify-content: center;
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
