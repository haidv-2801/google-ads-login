import logo from './logo.svg';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './App.css';

function App() {

  const responseGoogle = (res) => {
    console.log('res', res)
  }

  const logout = (res) => {
    alert("logout success")
    debugger
  }

  const renderChildren = (props) => {
    return <button onClick={props.onClick}>login</button>
  }

  const GGElement = (renderChildren, onSuccess, onFailure, props = {}) => {
    return <GoogleLogin
      clientId="13516959677-pajthcvvv5or0oatfpk1j1kf0n7t8na2.apps.googleusercontent.com"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      responseType="code"
      accessType='offline'
      render={(innerProps) => renderChildren(innerProps)}
      scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/adwords"
      {...props}
    />
  }

  function Login() {

    FB.api('/me/permissions', 'delete', function (response) { });
    setTimeout(() => {
      FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          window.localStorage.setItem("FACE_BOOK_INFO", JSON.stringify((response.authResponse.accessToken)))
        } else if (response.status === 'not_authorized') {
          FB.login(function (response) {
            window.localStorage.setItem("FACE_BOOK_INFO", JSON.stringify((response.authResponse.accessToken)))
          })
        } else {
          FB.login(function (response) {
            window.localStorage.setItem("FACE_BOOK_INFO", JSON.stringify((response.authResponse.accessToken)))
          })
        }
      });
    }, 0);

  }

  function Logout() {
    // FB.api('/me/permissions', 'delete', function (response) {
    //   alert(JSON.stringify(response))
    //   Login()
    // });
    FB.logout(function (res) { })

  }

  function popitup(url, windowName) {
    let newwindow = window.open(url, windowName, 'height=600,width=600,toolbar=0,menubar=0,left=50%,top=50%');
    if (window.focus) { newwindow.focus() }
    return false;
  }

  const popupCenter = ({ url, title, w, h }) => {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title,
      `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    )

    if (window.focus) newWindow.focus();
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
      {/* {GGElement(renderChildren, responseGoogle, responseGoogle)} */}
      <GoogleLogout
        clientId="13516959677-pajthcvvv5or0oatfpk1j1kf0n7t8na2.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
        onFailure={() => alert("logout failed")}

      ></GoogleLogout>
      <GoogleLogin
        clientId="13516959677-pajthcvvv5or0oatfpk1j1kf0n7t8na2.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        buttonText="Sign in with Google"
        cookiePolicy={'single_host_origin'}
        responseType="code"
        accessType='offline'
        render={(props) => <button onClick={props.onClick}>Login gg</button>}
        prompt="select_account"
        scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/adwords"
      />
      <button onClick={Login}>Login fb</button>
      <button onClick={Logout}>Logout fb</button>
      <button onClick={() => {
        FB.api("/me", res => {
          if (!res || res.error) {
            Login()
          }
          console.log(res);
        }, { accessToken: window.localStorage.getItem("FACE_BOOK_INFO") })
      }}>Get me</button>
      <button onClick={() => {

        popupCenter({ url: "https://www.facebook.com/", title: "", w: 600, h: 600 })


      }}>show popup facebook</button>
    </div>
  );
}

export default App;
