import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    return (
        <Box>
            <Flex>
                <Logo src="/images/logo.png" />
            </Flex>

            <Wrapper>
                <Row>
                    <Column>
                        <Heading>About Us</Heading>
                        <FooterLink href="#">Crypto</FooterLink>
                        <FooterLink href="#">CryptoCurrency</FooterLink>
                        <FooterLink href="#">BlockChain</FooterLink>
                        <FooterLink href="#"></FooterLink>
                    </Column>
                    <Column>
                        <Heading>Services</Heading>
                        <FooterLink href="#">LaunchPad</FooterLink>
                        <FooterLink href="#">Liquidity Locker</FooterLink>
                        <FooterLink href="#">Token Mint</FooterLink>
                        <FooterLink href="#">NFT Market Place</FooterLink>
                        <FooterLink href="#">Swap</FooterLink>
                        <FooterLink href="#">P2E Games</FooterLink>
                    </Column>
                    <Column>
                        <Heading>Contact Us</Heading>
                        <FooterLink href="#">linchpad@gmail.com</FooterLink>
                        <FooterLink href="#">042-5555-555-55</FooterLink>
                        <FooterLink href="#">xyz street </FooterLink>
                    </Column>
                    <Column>
                        <Heading>Social Media</Heading>
                        <FooterLink href="#">
                            <i className="fab fa-facebook-f">
                                <span style={{marginLeft: '10px'}}>Facebook</span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-instagram">
                                <span style={{marginLeft: '10px'}}>Instagram</span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-twitter">
                                <span style={{marginLeft: '10px'}}>Twitter</span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-youtube">
                                <span style={{marginLeft: '10px'}}>Youtube</span>
                            </i>
                        </FooterLink>
                    </Column>
                </Row>
            </Wrapper>
        </Box>
    )
}
const Flex = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 0.5rem;
`
const Box = styled.div`
    padding: 80px 60px;
    background: #eee;
    //   position: absolute;
    bottom: 0;
    // width: 100%;

    @media (max-width: 1000px) {
        padding: 70px 30px;
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    /* background: red; */
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 60px;
`

const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
    grid-gap: 20px;

    @media (max-width: 1000px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`

const FooterLink = styled.a`
    color: black;
    margin-bottom: 20px;
    font-size: 18px;
    text-decoration: none;

    &:hover {
        color: #333;
        transition: 200ms ease-in;
    }
`

const Heading = styled.p`
    font-size: 24px;
    color: black;
    margin-bottom: 40px;
    font-weight: bold;
`

const Logo = styled.img`
    width: 14rem;
    padding: 0rem;
`
export default Footer
