import React, {useState} from 'react'
import styled from 'styled-components'
import 'react-responsive-modal/styles.css'
import {Modal} from 'react-responsive-modal'
const CreateToken = ({open, closeModel}) => {
    const [, setHash] = useState(false)
    const [Name, setName] = useState('')
    const [Symbol, setSymbol] = useState('')
    const [Decimal, setDecimal] = useState('')
    const [NameError] = useState(true)
    const [SymbolError] = useState(true)
    const [DecimalError] = useState(true)
    const [TotalSupplyError] = useState(true)
    const [TotalSupply, settotalSupply] = useState('')
    return (
        <>
            <Modal
                open={open}
                center
                onClose={() => {
                    setHash(false)
                    closeModel()
                }}
                style={{Index: 2}}
                classNames={{
                    modal: 'createTokenModel'
                }}>
                <ModalWrapper>
                    <h2>Create Token</h2>
                    <div>
                        <FormGroup>
                            <Label>Name</Label>
                            <TextInput placeholder="NAME" type="text" value={Name} onChange={(e) => setName(e.target.value)} />
                            {NameError && <Error>Name is a required field</Error>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Symbol</Label>
                            <TextInput placeholder="SYMBOL" type="text" value={Symbol} onChange={(e) => setSymbol(e.target.value)} />
                            {SymbolError && <Error>Symbol is always in UPPERCASE</Error>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Decimal</Label>
                            <TextInput placeholder="18" type="text" value={Decimal} onChange={(e) => setDecimal(e.target.value)} />
                            {DecimalError && <Error>1-18(1e18=1BNB)</Error>}
                        </FormGroup>
                        <FormGroup>
                            <Label>Total Supply</Label>
                            <TextInput placeholder="10000000000" type="text" value={TotalSupply} onChange={(e) => settotalSupply(e.target.value)} />
                            {TotalSupplyError && <Error>Total Supply</Error>}
                        </FormGroup>
                        <Flex>
                            <Button>CreateToken</Button>
                        </Flex>
                    </div>
                </ModalWrapper>
            </Modal>
        </>
    )
}

const ModalWrapper = styled.div`
    padding: 2rem;
`
const Label = styled.div`
    padding: 0;
    color: #333;
    font-size: 1rem;
    font-weight: bold;
    padding-bottom: 0.5rem;
    margin: 0;
`
const FormGroup = styled.div`
    color: #333;
    font-size: 1rem;
    font-weight: bold;
    align-items: center;
    padding-bottom: 1rem;
    margin: 0;
`
const TextInput = styled.input`
    width: 100%;
    outline: none;
    font-size: 1rem;
    letter-spacing: 0.1rem;
    text-align: left;
    color: #333;
    border: 0.1rem solid #eee;
    background: white;
    border-radius: 0.3rem;
    padding: 0.5rem 0.5rem;
`
const Button = styled.button`
    color: black;
    padding: 0.5rem;
    background: #00bcd4;
    color: white;
    border: none;
    border-radius: 0.3rem;
`
const Flex = styled.div`
    display: flex;
    justify-content: center;
`
const Error = styled.span`
    color: #00bcd4;
    font-size: 0.7rem;
`
export default CreateToken
