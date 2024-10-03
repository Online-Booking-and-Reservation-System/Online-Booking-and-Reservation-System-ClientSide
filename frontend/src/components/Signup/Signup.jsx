import './Signup.css';

function Signup() {
   return <> 
   <div className="signup-container">
        <h2 className="su">create your account!</h2>
        <form className="signup">
            <input type="text" 
              placeholder="type in your username.."/>
            <input type="email"
              placeholder="type in your email.."/>
            <input type="password"
              placeholder="type in your password.."/>
            <button className="signup-btn2">create account</button>
        </form>
        
    </div>
   </>
}

export default Signup;