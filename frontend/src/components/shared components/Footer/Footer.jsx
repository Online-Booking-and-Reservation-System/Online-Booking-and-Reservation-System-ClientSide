import './Footer.css'

function Footer(){
    return(
        <footer>
            {/* <div className='register'>
                <div className='paragraph'>
                    <h1>REGISTER FOR</h1>
                    <h1 className='orange'>FREE</h1>
                </div>
            </div> */}
            <div className='contact'>
                <div className='logo'>
                    <p>Table<strong>Booky</strong></p>
                </div>
                <div className='links'>
                        <p>Service</p>
                        <p>About</p>
                        <p>Contact Us</p>
                        <p>FAQs</p>
                        <p>Sign In</p>
                </div>
                <div className='credits'>
                    <p>TableBooky.com | All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;