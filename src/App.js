import logo from './logo.svg';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './App.css';

function App() {

  const responseGoogle = (res) => {
    var profile = res.getBasicProfile();
    alert(res.profileObj.givenName)
    debugger
  }

  const logout = (res) => {
    alert("logout success")
    debugger
  }

  const renderChildren = (props) => {
    debugger
    return <button onClick={props.onClick}>login</button>
  }

  const GGElement = (renderChildren, onSuccess, onFailure, props = {}) => {
    return <GoogleLogin
      clientId="13516959677-pajthcvvv5or0oatfpk1j1kf0n7t8na2.apps.googleusercontent.com"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      render={(innerProps) => renderChildren(innerProps)}
      {...props}
    />
  }

  function Login() {
    FB.getLoginStatus(function (response) {
      debugger
      if (response.status === 'connected') {
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
      } else if (response.status === 'not_authorized') {
        FB.login(function (response) {
          debugger
        })
      } else {
        FB.login(function (response) {
          debugger
        })
      }
    });

  }

  return (
    <div className="App">
      {/* <GoogleLogin
        clientId="13516959677-pajthcvvv5or0oatfpk1j1kf0n7t8na2.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
     

      <GoogleLogin
        clientId="13516959677-pajthcvvv5or0oatfpk1j1kf0n7t8na2.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        render={(props) => (<button onClick={props.onClick}>test</button>)}
      /> */}
      {GGElement(renderChildren, responseGoogle, responseGoogle)}
      <GoogleLogout
        clientId="13516959677-pajthcvvv5or0oatfpk1j1kf0n7t8na2.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
        onFailure={() => alert("logout failed")}
      ></GoogleLogout>

      <button onClick={Login}>Login fb</button>
    </div>
  );
}

export default App;
