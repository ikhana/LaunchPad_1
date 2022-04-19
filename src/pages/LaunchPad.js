import React, { useState } from "react";
import web3 from 'web3';
import styled from "styled-components";
import { Container, Row, Col } from "styled-bootstrap-grid";
import WalletConnectProvider from "@walletconnect/web3-provider";
import DateTimePicker from 'react-datetime-picker'
import { ethers } from "ethers";
import moment from 'moment'
const bytes32 = require('bytes32');

const LaunchPad = () => {
  const [tokenAddress, setTokenAddess] = useState('');
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [tokenPrice, settokenPrice] = useState('0.1');
  const [tokenPriceError, settokenPriceError] = useState(false);
  const [softCap, setSoftCap] = useState('0.5');
  const [softCapError, setSoftCapError] = useState(false);
  const [hardCap, setHardCap] = useState('2.0');
  const [hardCapError, setHardCapError] = useState(false);
  const [minimum, setMinimum] = useState('0.1');
  const [minimumError, setMinimumError] = useState(false);
  const [maximum, setMaximum] = useState('0.5');
  const [maximumError, setMaximumError] = useState(false);
  const [liquidity, setLiquidity] = useState('99');
  const [liquidityError, setLiquidityError] = useState(false);
  const [listingPrice, setListingPrice] = useState('0.11');
  const [listingPriceError, setListingPriceError] = useState(false);
  const [liquidityLockup, setLiquidityLockup] = useState(new Date());
  const [liquidityLockupError, setLiquidityLockupError] = useState(false);
  const [lpTokensDurationInDays, setLpTokensDurationInDays] = useState('10');
  const [lpTokensDurationInDaysError, setLpTokensDurationInDaysError] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date())
  const [startTimeError, setStartTimeError] = useState(false);
  const [saleTitle, setSaleTitle] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [discord, setDiscord] = useState('');
  const [twitter,setTwitter] = useState('');
 const [website, setWebsite] = useState('');

  const [whiteList,setWhiteList ] = useState( ['0x108BC24F725B3AE247704926dA097349171ef059','0x108BC24F725B3AE247704926dA097349171ef059']);
  const [name, setName] = useState("");

  const [presalePrice, setPresalePrice] = useState("");
  const [presalePriceError, setPresalePriceError] = useState(false);
  
  const checktokenPrice = () => {
      if(tokenPrice.trim() === ''){
        settokenPriceError(true)
      }}
const checkpresalePrice = () => {
      if(presalePrice.trim() === ''){
        setPresalePriceError(true)
      }
      else{
        settokenPriceError(false)
      }
  }
  const checksoftCap = () => {
    if(softCap.trim() === ''){
      setSoftCapError(true)
    }
    else{
      setSoftCapError(false)
    }
}
const checkhardCap = () => {
    if(hardCap.trim() === ''){
      setHardCapError(true)
    }
    else{
      setHardCapError(false)
    }
}
const checkminimum = () => {
    if(minimum.trim() === ''){
      setMinimumError(true)
    }
    else{
      setMinimumError(false)
    }
}
const checkmaximum = () => {
    if(maximum.trim() === ''){
      setMaximumError(true)
    }
    else{
      setMaximumError(false)
    }
}
const checkliquidity = () => {
    if(liquidity.trim() === ''){
      setLiquidityError(true)
    }
    else{
      setLiquidityError(false)
    }
}
const checklpTokensDurationInDays = () => {
  if(liquidity.trim() === ''){
    setLpTokensDurationInDaysError(true)
  }
  else{
    setLpTokensDurationInDaysError(false)
  }
}
const checklistingPrice = () => {
    if(listingPrice.trim() === ''){
      setListingPriceError(true)
    }
    else{
      setListingPriceError(false)
    }
}
const checkliquidityLockup = () => {
    if(liquidityLockup.trim() === ''){
      setLiquidityLockupError(true)
    }
    else{
      setLiquidityLockupError(false)
    }
}
const checkstartTime = () => {
    if(startTime.trim() === ''){
      setStartTimeError(true)
    }
    else{
      setStartTimeError(false)
    }
}

const reg_expression = /^(0x)?[0-9a-f]{40}$/;
const reg_for_positive = /^[+]?\d*(?:[.,]\d*)?$/;
async function requestAccount() {
  await window.ethereum.request({method: 'eth_requestAccounts'});
}

const unsoldTokensDumpAddress = "0x000000000000000000000000000000000000dEaD"

async function  getTupleSet()  {
  let  _firstTuple= {
    tokenAddress:tokenAddress,
    unsoldTokensDumpAddress:unsoldTokensDumpAddress,
    tokenPrice: ethers.utils.parseUnits(tokenPrice,18).toString(),
    hardCap: ethers.utils.parseUnits(hardCap, 18).toString(),
    softCap: ethers.utils.parseUnits(softCap, 18).toString(),
    maximum: ethers.utils.parseUnits(maximum, 18).toString(),
    minimum: ethers.utils.parseUnits(minimum,18).toString(),
    startTime:moment(startTime).unix().toString(),
    endTime: moment(endTime).unix().toString()
  }
  let _infoTuple= {
    listingPrice: ethers.utils.parseUnits(listingPrice,18).toString(),
    liquidityLockup: moment(liquidityLockup).unix().toString(),
    lpTokensDurationInDays,
    liquidity,
  }
  let _socialTuple = {
    saleTitle: bytes32({ input: saleTitle, ignoreLength: true }),
    telegramLink:bytes32({ input: telegramLink, ignoreLength: true }),
    discord: bytes32({ input: discord, ignoreLength: true }),
    twitter:bytes32({ input: twitter, ignoreLength: true }),
    website:bytes32({ input: website, ignoreLength: true }),
    
  }
console.log('types of first tuple', 
typeof(tokenAddress),
typeof(unsoldTokensDumpAddress),
typeof(tokenPrice),
typeof(hardCap),
typeof(softCap),
typeof(maximum),
typeof(minimum),
typeof(startTime),
typeof(endTime),

"types of second tuple",
typeof(listingPrice),
typeof(liquidityLockup),
typeof(lpTokensDurationInDays),
typeof(liquidity),
"type of third tuple",
typeof(saleTitle),
typeof(telegramLink),
typeof(discord),
typeof(twitter),
typeof(website),
"first tuple ==>",_firstTuple,
"InfoTuple ==>", _infoTuple, "Social Tuple ==>", _socialTuple)


  
    if (!_firstTuple && !_infoTuple && !_socialTuple) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider })
      const signer = provider.getSigner()
      console.log(signer.getAddress())
      //const contract = new ethers.Contract(InvestmentFactoryAddress, InvestmentsFatory.abi , signer)
     
       // const transaction = await contract.createPresale(_firstTuple,_infoTuple,_socialTuple)
      //await transaction.wait()
     
      
    }
}

const toggle = (index) =>{
if(index === 1){
  (stepOne === false ? setStepOne(true) : setStepOne(false))
}
else{
  setStepOne(false)
}
if(index === 2){
  (stepTwo === false ? setStepTwo(true) : setStepTwo(false))
}
else{
  setStepTwo(false)
}
if(index === 3){
  (stepThree === false ? setStepThree(true) : setStepThree(false))
}
else{
  setStepThree(false)
}
if(index === 4){
  (stepFour === false ? setStepFour(true) : setStepFour(false))
}
else{
  setStepFour(false)
}
}
  

 



  return (
    <Container>
         <Spacer />
         <Spacer />
      <Row>
        <Col>
          <Heading>Create Launchpad</Heading>
        </Col>
        <CardCol lg={3}>
          <List>
            <Card active={stepOne}>
              <CardHeading>Add Token Address</CardHeading>
            </Card>
          </List>
        </CardCol>
        <CardCol lg={3}>
          <List>
            <Card active={stepTwo}>
              <CardHeading>Defi Launchpad Info</CardHeading>
            </Card>
          </List>
        </CardCol>
        <CardCol lg={3}>
          <List>
            <Card active={stepThree}>
              <CardHeading>Add Additional Info </CardHeading>
            </Card>
          </List>
        </CardCol>
        <CardCol lg={3}>
          <List>
            <Card active={stepFour}>
              <CardHeading>Finish and Review your information</CardHeading>
            </Card>
          </List>
        </CardCol>
      </Row>
      <Spacer />
      <Row>
        <FlexCenter>
          <Button
            onClick={() => {
              setStepOne(true);
            }}
          >
            Begin
          </Button>
        </FlexCenter>
      </Row>
      <Spacer />
      <Row>
        <Col lg={8} offset={2}>
          <Stepper>
            <Item>
              <StepperHead onClick={()=>toggle(1)}>
                <Step>1</Step>Add Token Address
              </StepperHead>
              {stepOne && (
                <StepperBody>
                  <Container>
                    <Row>
                      <Col>
                        <Label>Token Address</Label>
                        <InputText value={tokenAddress}  onChange={e=>{
                           setTokenAddess(e.target.value.toLowerCase())}}/>
                        {tokenAddress && reg_expression.test(tokenAddress) === false && <Alblur>Please Enter a valid token address</Alblur>}
                        <Text>Create Pool Fee: 1 BNB or 1%</Text>
                      </Col>
                    </Row>
                  </Container>
                  <StepperFooter>
                    <Next
                      onClick={() => {
                        setStepOne(false);
                        setStepTwo(true);
                      }}
                    >
                      Next
                    </Next>
                  </StepperFooter>
                </StepperBody>
              )}
            </Item>
            <Line></Line>
            <Item>
            <StepperHead onClick={()=>toggle(2)}>
              <Step>2</Step>Defi Launchpad Info
              </StepperHead>
              {stepTwo && (
                <StepperBody>
                  <Container>
                    <Row>
                      <CustomCol lg={12}>
                       {/*<Label>Presale Price</Label>
                        <InputText value={presalePrice} type='number' min="0" step="1" pattern="\d+" onChange={(e)=>{setPresalePrice(e.target.value)}} onBlur={checktokenPrice}/>
                        {presalePrice && reg_for_positive.test(presalePrice) == false && <Alblur>Presale Price must be Positive Number</Alblur>}*/} 
                        <Label>Token Price</Label>
                        <InputText value={tokenPrice} type='number' min="0" step="1"  pattern="\d+" onChange={(e)=>{settokenPrice(e.target.value)}} onBlur={checkpresalePrice}/>
                        {tokenPrice && reg_for_positive.test(tokenPrice) === false && <Alblur>Token Price must be Positive Number</Alblur>}
                      </CustomCol>
                     
                     

                      <CustomCol lg={6}>
                        <Label>Mimimum Investment you are looking for </Label>
                        <InputText value={softCap} type='number' min="0" step="1"  pattern="\d+" onChange={(e)=>{setSoftCap(e.target.value)}} onBlur={checksoftCap}/>
                        {softCap && reg_for_positive.test(softCap) == false && <Alblur>SoftCap must be Positive Number</Alblur>}
                        <Text>Minimum Investment grrater than 50% of Maximum Invesetment</Text>
                      </CustomCol>
                      <CustomCol lg={6}>
                        <Label>Maximum Investment you want to achieve</Label>
                        <InputText value={hardCap} type='number' min="0" step="1"  pattern="\d+" onChange={(e)=>{setHardCap(e.target.value)}} onBlur={checkhardCap}/>
                        {hardCap && reg_for_positive.test(hardCap) == false && <Alblur>HardCap must be Positive Number</Alblur>}
                      </CustomCol>
                      <CustomCol lg={6}>
                        <Label>Minimum Purchase buyer should make (e.g 0.1 BNB)</Label>
                        <InputText value={minimum} type='number' min="0" step="1"  pattern="\d+" onChange={(e)=>{setMinimum(e.target.value)}} onBlur={checkminimum}/>
                        {minimum && reg_for_positive.test(minimum) == false && <Alblur>Minimum must be Positive Number</Alblur>}
                      </CustomCol>
                      <CustomCol lg={6}>
                        <Label>Maximum inimum Purchase buyer can make (e.g 0.5 BNB)</Label>
                        <InputText value={maximum} type='number' min="0" step="1"  pattern="\d+" onChange={(e)=>{setMaximum(e.target.value)}} onBlur={checkmaximum}/>
                        {maximum && reg_for_positive.test(maximum) == false && <Alblur>Maximum must be Positive Number</Alblur>}
                      </CustomCol>
                      <CustomCol lg={6}>
                        <Label>{name + "Liquidity (%)"} </Label>
                        <InputText value={liquidity} type='number' min="0" step="1"  pattern="\d+" onChange={(e)=>{setLiquidity(e.target.value)}} onBlur={checkliquidity}/>
                        {liquidityError && <Alblur>Liquidity must be{'>'}50%</Alblur>}
                      </CustomCol>
                      <CustomCol lg={6}>
                        <Label>{name + "Listing Price"}</Label>
                        <InputText value={listingPrice} type='number' min="0" step="1"  pattern="\d+" onChange={(e)=>{setListingPrice(e.target.value)}} onBlur={checklistingPrice}/>
                        {listingPriceError && <Alblur>Listing Price must be Positive Number</Alblur>}
                      </CustomCol>
                      <CustomCol lg={12}>
                        <Text>
                          Enter the percentage of raised funds that should be
                          allocated to Liquidity on (Min 51%, Max 100%)
                        </Text>
                        <Text>
                          If I spend 1 BNB on how many tokens will I receive?
                          Usually this amount is lower than presale rate to
                          allow for a higher listing price on
                        </Text>
                      </CustomCol>
                      <CustomCol lg={12}>
                        <Label>Select start time & end time (LocalTime)</Label>
                      </CustomCol>
                      <CustomCol lg={6}>
                        <Label>Start Time (LocalTime)</Label>
                        {/*<InputText value={startTime} onChange={(e)=>{setStartTime(e.target.value)}} onBlur={checkstartTime}/>*/}
                        {/* <DateTimePicker onSelect={(e)=>{setStartTime(e.target.value)}}  value={startTime} /> */}
                        <DateTimePicker onChange={setStartTime} value={startTime} />
                         
                        {startTimeError && <Alblur>Start Time need to be Before End Time</Alblur>}
                      </CustomCol>
                      <CustomCol lg={6}>
                        <Label>End Time (LocalTime)</Label>
                        <DateTimePicker onChange={setEndTime} value={endTime} />
                      </CustomCol>
                      <CustomCol lg={6}>
                        <Label>Liquidity lockup (second)</Label>
                        <div>
                        {/* <InputText value={liquidityLockup} onChange={(e)=>{setLiquidityLockup(e.target.value)}}  */}
                        <DateTimePicker value={liquidityLockup} onChange={setLiquidityLockup} onBlur={checkliquidityLockup}/>
                        </div>
                        {liquidityLockupError && <Alblur>LockUp Time must be {'>'} 5 Seconds</Alblur>}
                      </CustomCol>
                      <CustomCol lg={6}>
                        <Label>Liquidity lockup (Days)</Label>
                        <InputText value={lpTokensDurationInDays} onChange={(e)=>{setLpTokensDurationInDays(e.target.value)}} onBlur={checklpTokensDurationInDays}/>
                        {lpTokensDurationInDaysError && <Alblur>Lock lpToken Duration must be {'>'} endTime</Alblur>}
                      </CustomCol>
                    </Row>
                  </Container>
                  <StepperFooter>
                    <Back
                      onClick={() => {
                        setStepOne(true);
                        setStepTwo(false);
                      }}
                    >
                      Back
                    </Back>
                    <Next
                      onClick={() => {
                        setStepTwo(false);
                        setStepThree(true);
                      }}
                    >
                      Next
                    </Next>
                  </StepperFooter>
                </StepperBody>
              )}
            </Item>
            <Line></Line>
            <Item>
              <StepperHead onClick={()=>toggle(3)}>
                <Step>3</Step>Add your project details
              </StepperHead>
              {stepThree && (
                <StepperBody>
                  <Container>
                    <Row>
                      <CustomCol lg={6}>
                        <Label>Sale Title</Label>
                        <InputText  value={saleTitle} onChange={(e)=>{setSaleTitle(e.target.value)}} />
                      </CustomCol>
                      <CustomCol lg={6}>
                        <Label>Telegram Link</Label>
                        <InputText  value={telegramLink} onChange={(e)=>{setTelegramLink(e.target.value)}}/>
                      </CustomCol>
                      <CustomCol lg={6}>
                        <Label>Discord </Label>
                        <InputText  value={discord} onChange={(e)=>{setDiscord(e.target.value)}} />
                      </CustomCol>
                      <CustomCol lg={6}>
                        <Label>Twitter </Label>
                        <InputText  value={twitter} onChange={(e)=>{setTwitter(e.target.value)}} />
                      </CustomCol>
                      <CustomCol lg={12}>
                        <Label>Website</Label>
                        <InputText  value={website} onChange={(e)=>{setWebsite(e.target.value)}} />
                      </CustomCol>
                    </Row>
                  </Container>
                  <StepperFooter>
                    <Back
                      onClick={() => {
                        setStepTwo(true);
                        setStepThree(false);
                      }}
                    >
                      Back
                    </Back>
                    <Next
                      onClick={() => {
                        setStepThree(false);
                        setStepFour(true);
                      }}
                    >
                      Next
                    </Next>
                  </StepperFooter>
                </StepperBody>
              )}
            </Item>
            <Line></Line>
            <Item>
              <StepperHead onClick={()=>toggle(4)}>
                <Step>4</Step>Submit KYC and AUDIT
              </StepperHead>
              {stepFour && (
                <StepperBodyLast>
                  <Container>
                    <Row>
                
                    </Row>
                  </Container>
                  <StepperFooter>
                    <Back
                      onClick={() => {
                        setStepThree(true);
                        setStepFour(false);
                      }}
                    >
                      Back
                    </Back>
                    <Next
                     
                      onClick={()=>{getTupleSet(); setStepFour(false);}}
                    >
                      Finish 
                    </Next>
                  </StepperFooter>
                </StepperBodyLast>
              )}
            </Item>
          </Stepper>
        </Col>
      </Row>
      <Spacer />
    </Container>
  );
};
const Heading = styled.h1`
  text-align: center;
`;

const CustomCol = styled(Col)`
  padding: 0rem 1rem;
  box-sizing: border-box;
`;

const CardCol = styled(Col)`
  padding: 0rem;
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 11rem;
    right: -3rem;
    z-index: -1;
    border-top: 3px dotted #00bcd4;
  }
`;
const List = styled.div`
  display: flex;
  margin: 1rem 0rem;
  justify-content: center;
`;
const Card = styled.div`
  text-align: center;
  position: relative;
  padding: 2rem;
  background: ${({ active }) => (active ? "#00bcd4" : "white")};
  color: ${({ active }) => (active ? "white" : "black")};
  border-radius: 0.2rem;
  border: none;
  font-size: 1rem;
  margin: 0rem 0.5rem;
  width: 8rem;
  height: 3rem;
  box-shadow: 0 0 1px rgb(0 0 0 / 17%), 0 4px 8px rgb(0 0 0 / 8%),
    0 8px 12px rgb(0 0 0 / 0%), 0 12px 16px rgb(0 0 0 / 2%);
`;

const CardHeading = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;
const Spacer = styled.div`
  height: 3rem;
`;

const Button = styled.a`
  padding: 0.8rem 2rem;
  background: #00bcd4;
  color: white;
  border-radius: 0.4rem;
  border: none;
  font-size: 1rem;
  margin: 0rem 0.5rem;
  cursor:pointer;
  &:hover {
    background: #05b5cc;
  }
`;

const FlexCenter = styled(Col)`
  display: flex;
  justify-content: center;
`;

const Stepper = styled.ul``;
const Item = styled.li`
  list-style: none;
`;
const StepperHead = styled.div`
  display: flex;
  align-items: center;
  cursor:pointer;
`;
const StepperBody = styled.div`
  border-left: 0.2rem dotted #00bcd4;
  padding: 2rem 2rem 0rem 2rem;
  margin-left: 0.9rem;
`;
const StepperBodyLast = styled(StepperBody)`
  border-left: none;
  padding: 2rem;
  margin-left: 0.9rem;
  display: flex;
  justify-content: center;
`;
const StepperFooter = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: flex-end;
`;
const Step = styled.div`
  width: 2rem;
  background: #00bcd4;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  color: white;
  margin-right: 1rem;
  cursor:pointer;
`;
const Line = styled.span`
  width: 2rem;
  border-left: 0.2rem dotted #00bcd4;
  height: 2rem;
  display: flex;
  margin-left: 0.9rem;
`;

const Back = styled(Button)`
  padding: 0.5rem 2rem !important;
  font-size: 0.9rem !important;
  background: #e91e63;
  &:hover {
    background: #d11555 !important;
  }
`;
const Next = styled(Button)`
  padding: 0.5rem 2rem !important;
  font-size: 0.9rem !important;
`;

const Label = styled.p`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
`;
const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  font-size: 14px;
  border: 0.09rem solid #e3e2e2;
  border-radius: 0.3rem;
`;
const InputText = styled.input`
  // outline:none;
  width: 100%;
  font-size: 1.1rem;
  padding: 0.4rem;
  border: 0.09rem solid #e3e2e2;
  border-radius: 0.3rem;
  box-sizing: border-box;
`;

const Text = styled.p`
  width: 100%;
  font-size: 0.8rem;
  color: #00bcd4;
`;
const Alblur =styled.span`
width: 100%;
font-size: 0.8rem;
color: red;
`
export default LaunchPad;




/*  if(typeof window.ethereum !== undefined) {


    const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/e7218ebfa4cd4b65bd3d4c5a508f03a8");
        // const contract = new ethers.Contract(InvestmentFactoryAddress,InvestmentsFatory.abi,provider);
        // try {
        //     let allowance = await contract.g(_firstTuple, _infoTuple, _socialTuple);
        //     console.log(allowance)
        // } catch (error) {
        //     console.log(error?.message);
        // }

    // await window.ethereum.enable()
     console.log("there 1");
    window.ethereum.request({ method: "eth_requestAccounts" })
    console.log("there 2");
    //const provider = new ethers.providers.JsonRpcProvider(infuraURL);
    console.log("there 3");
    const signer = await provider.getSigner();
    console.log("there 4 " + JSON.stringify(signer));
    const contract1 = new ethers.Contract(InvestmentFactoryAddress,InvestmentsFatory.abi,signer);
    console.log("there 5 " + JSON.stringify(contract1));
    //const a = await signer.getAddress();
    //console.log(a);
    try {
      //const launcInfo = await contract1.createPresale(_firstTuple, _infoTuple, _socialTuple)
      console.log("there 5");
      const owner = await contract1.owner();
      console.log("Owner  ==>", owner)
      //console.log("contract " , contract1.address);
      //console.log("Signer is ", signer)
      
    } catch (error) {
      console.log("error is ", error)
      
     }
    
   
   
  }

} 

//const InvestmentFactoryAddress = '0x3c73082428105B6883c4C8cbFAF67b3b5a4DE19b'//'0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1z'
const infuraURL = 'https://speedy-nodes-nyc.moralis.io/5ac4c487391f3e1daf14e811/bsc/testnet';

// InvestementInfo deployed to 0x583516d49e6824410B15b8E775963105A5eC83f5
// Invesemnt Presale 0x2A7EdE7Ba8B2B4171f13Ab22ba24C28751D0b7cb
import InvestmentsFatory from '../artifacts/contracts/InvestmentsFactory.sol/InvestmentsFactory.json';
*/
