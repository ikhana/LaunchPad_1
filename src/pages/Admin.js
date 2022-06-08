import React, {useState} from 'react'
import styled from 'styled-components'
import {Container, Row, Col} from 'styled-bootstrap-grid'
import {useSelector} from 'react-redux'

const Admin = () => {
    const investmentInfoRead = useSelector((state) => state.auth.investmentInfoRead)
    const [devFeePercentage, setDevFeePercentage] = useState()
    const [devFeeInWei, setDevFeeInWie] = useState()
    const [presaleCount, setPreSaleCount] = useState()
    const [preSaleAddress, setPreSaleAddress] = useState()
    const [adminOwner, setAdminOwner] = useState()

    const setDevFeeInPercent = async () => {}

    const logGet = async () => {
        if (!investmentInfoRead) {
            toast.error('you are trying to connect to a null contract')
        }

        //const investmentFactoryRead = new ethers.Contract(investmentFactory.id, investmentFactory.abi, provider)
        //  InvetmentInfo mostly Related to Admin work which includes
        // Developer fee percentage
        // number of Preslsale made
        // setting minimum developer fee in wie ==> setMinDevFeeInWei
        // get a presale address against an id
        //Presale ContractFactory Owner or Admin
        //const investmentInfoRead = new ethers.Contract( InvestementInfo.id,InvestementInfo.abi, signer)
        setDevFeeInWie(await investmentInfoRead.getMinDevFeeInWei())
        setDevFeePercentage(await investmentInfoRead.getDevFeePercentage())
        setPreSaleCount(await investmentInfoRead.getPresalesCount())
        setPreSaleAddress(await investmentInfoRead.getPresaleAddress('0'))
        setAdminOwner(await investmentInfoRead.owner())
        console.log('Developer fee in percentage==>', devFeePercentage?.toString(), 'developer Fee in Wei =>', devFeeInWei.toString(), 'PreslaeCount', presaleCount.toString(), 'Presale adddress for id 0 ==>', preSaleAddress, 'Admin is ==>', adminOwner)

        //  This Part Deals with Admin Panle writn to the contract which includes admin ownership transfer
        // settting developer fee in wie or its percentage
        //const setMinDevFeeInWei = await InvetmentInfoRead.setMinDevFeeInWei("500000000")  // Setting Developer Fee in Wei
        //await setMinDevFeeInWei.wait()
        //const setDevFeeInPercent = await InvetmentInfoRead.setDevFeePercntage('3')   // Percentage e.g 1 , 2 ,3
        //await setDevFeeInPercent.wait();
        //const addPresaleAddress = await InvetmentInfoRead.addPresaleAddress("") // address 0x0234er43454322354
        //await addPresaleAddress.wait();
        //const transferOwnership = await InvetmentInfoRead.transferOwnership("") // adddress of the new owner
    }

    return (
        <Wrapper>
            <Row>
                <Column>
                    <Heading>Admin</Heading>
                </Column>
            </Row>

            <Row>
                <Column lg={6}>
                    Developer Fee Percentage: <Content>{devFeePercentage?.toString()}</Content>
                </Column>
                <Column lg={6}>
                    Developer Fee in Wei: <Content>{devFeeInWei?.toString()}</Content>
                </Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>
                    PreSale Count: <Content> {presaleCount?.toString()}</Content>
                </Column>
                <Column lg={6}>
                    PreSale Address: <Content>{preSaleAddress?.toString()}</Content>
                </Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>
                    LaunchPad Owner: <Content>{adminOwner?.toString()}</Content>
                </Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Set Developer Fee</Column>
                <Column lg={6}>
                    <InputText />
                </Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Set Developer Inwei</Column>
                <Column lg={6}>
                    <InputText />
                </Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Set Developer Fee in Percentage</Column>
                <Column lg={6}>
                    <InputText />
                </Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Add PreSale</Column>
                <Column lg={6}>
                    <InputText />
                </Column>
            </Row>
            <Spacer />
            <Row>
                <Column lg={6}>Transfer Ownership</Column>
                <Column lg={6}>
                    <InputText />
                </Column>
            </Row>
            <Spacer />
            <Spacer />
            <Row>
                <ButtonContent lg={12}>
                    <Button onClick={logGet}>Save</Button>
                </ButtonContent>
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

export default Admin
