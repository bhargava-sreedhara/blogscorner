import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser,checkUserExists,saveUser,saveAuthor } from "./services/blogService";
import { useAuth } from "./context/AuthContext";

import './Login.css';

const Login = () => {

  const [ name,setName ] = useState("");
  const [ bio,setBio ] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [ errors,setErrors ] = useState({});
  const [ loginErrors,setLoginErrors ] = useState({})

  const [ isAuthor,setIsAuthor ] = useState(false);
  const [ isRegisterMode,setIsRegisterMode ] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const currentErrors = { ...errors };
    if( name === "" )
    {
        currentErrors.name = "Name is Mandatory.";
    }
    else
    {
        const alphaExp = /^[a-zA-Z\s]+$/;
        if( alphaExp.test(name) )
        {
            delete currentErrors.name;
        }
        else
        {
            currentErrors.name = "Name should only be alphabetics.";
        }
    }

    if( isAuthor )
    {
        if( bio === "" )
        {
            currentErrors.bio = "Bio is Mandatory."
        }
        else
        {
            const alphaNumExp = /^[a-zA-Z0-9.;\s]+$/;
            if( bio.match(alphaNumExp) )
            {
                delete currentErrors.bio;
            }
            else
            {
                currentErrors.bio = "Bio should only be alphabetics or digits.";
            }
        }
    }

    if( email === "" )
    {
        currentErrors.email = "Email is Mandatory."
    }
    else
    {
        // eslint-disable-next-line no-useless-escape
        const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if( emailExp.test(email) )
        {
            delete currentErrors.email;
        }
        else
        {
            currentErrors.email = "Email is to be valid."
        }
    }

    if( password === "" )
    {
        currentErrors.password = "Password is Mandatory."
    }
    else
    {
        delete currentErrors.password;
    }

    const userExists = await checkUserExists(email);
    if( userExists.data.length > 0 )
    {
        currentErrors.email = "Email already exists.."
    }

    setErrors(currentErrors);

    if( Object.keys(currentErrors).length > 0 )
    {
        alert( "Errors Exist." );
        return false;
    }

    try
    {
        const createdUserRes = await saveUser({
          "name": name,
          "email": email,
          "password": password,
          "role": "author"
        });

        const createdUser = createdUserRes.data;
        await saveAuthor(
        {
            "name": name,
            "bio": bio,
            "userId": createdUser.id
        });
    }
    catch(error)
    {
        console.log(error);
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    const currentLoginErrors  = { ...loginErrors };

    if( email === "" )
    {
      currentLoginErrors.email = "Email is Mandatory."
    }
    else
    {
      // eslint-disable-next-line no-useless-escape
      const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if( emailExp.test(email) )
      {
        delete currentLoginErrors.email;
      }
      else
      {
        currentLoginErrors.email = "Email is to be valid."
      }
    }

    if( password === "" )
    {
      currentLoginErrors.password = "Password is Mandatory."
    }
    else
    {
      delete currentLoginErrors.password;
    }

    setLoginErrors(currentLoginErrors);

    if( Object.keys(currentLoginErrors).length > 0 )
    {
        alert( "Errors Exist." );
        return false;
    }

    const res = await loginUser(email, password);

    if(res.data.length === 0){
      alert("Invalid credentials");
      return;
    }

    const user = res.data[0];

    await login(user);

    // ROLE BASED REDIRECT

    if(user.role === "author")
    {
      navigate("/author-dashboard");
    }
    else if(user.role === "admin")
    {
      navigate("/admin-dashboard");
    }
    else
    {
      navigate("/");
    }
  };

  const iAmAuthor = (checkEvent) =>{
    setIsAuthor( checkEvent.target.checked )
  }

  return (
    <div className="container p-5">

            <div className={`col-lg-6 p-5 shadow mx-auto text-center ${isRegisterMode ? 'd-none':''}`}>
                  <h3>Login</h3>

                  <form onSubmit={handleLogin}>

                    <input
                      type="email"
                      className={`form-control ${loginErrors.email ? ' is-invalid': 'mb-3'} `}
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    { loginErrors.email && (
                      <span className={`mb-3 d-flex flex-row justify-content-start ms-1 fw-bold text-danger`}>
                          {loginErrors.email}
                      </span>
                    ) }

                    <input
                      type="password"
                      className={`form-control ${loginErrors.password ? ' is-invalid': 'mb-3'} `}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    { loginErrors.password && (
                      <span className={`mb-3 d-flex flex-row justify-content-start ms-1 fw-bold text-danger`}>
                          {loginErrors.password}
                      </span>
                    ) }

                    <button className="form-control mb-3 text-bg-primary">
                      Login
                    </button>
                    <div className="row">
                        <div className="text-center">
                          <button type="button" onClick={()=>{setErrors({});setIsRegisterMode(true)}} className="btn regButton fw-bold">
                            Register
                          </button>
                        </div>
                    </div>

                  </form>

            </div>

            <div className={`col-lg-6 p-5 shadow mx-auto text-center  ${isRegisterMode ? '':'d-none'}  ${isAuthor ? 'author-bg':''}`}>
                    <h3>Register</h3>

                    <form onSubmit={handleRegister}>

                    <input
                      name="name"
                      className={`form-control ${errors.name ? ' is-invalid': 'mb-3'} `}
                      placeholder="Full Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    { errors.name && (
                      <span className={`mb-3 d-flex flex-row justify-content-start ms-1 fw-bold ${isAuthor ? 'mt-1 p-1 text-bg-danger':'text-danger'}`}>
                          {errors.name}
                      </span>
                    ) }

                    { isAuthor && (
                        <>
                          <input
                          name ="bio"
                          className={`form-control ${errors.bio ? ' is-invalid': 'mb-3'} `}
                          placeholder="Your Bio"
                          onChange={(e) => setBio(e.target.value)}
                        />
                        { errors.bio && (
                          <span className={`mb-3 d-flex flex-row justify-content-start ms-1 fw-bold mt-1 p-1 text-bg-danger`}>
                              {errors.bio}
                          </span>
                        )}
                        </>                        
                    )}

                    <input
                      type="email"
                      className={`form-control ${errors.email ? ' is-invalid': 'mb-3'} `}
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    { errors.email && (
                      <span className={`mb-3 d-flex flex-row justify-content-start ms-1 fw-bold ${isAuthor ? 'mt-1 p-1 text-bg-danger':'text-danger'}`}>
                          {errors.email}
                      </span>
                    ) }

                    <input
                      type="password"
                      className={`form-control ${errors.password ? ' is-invalid': 'mb-3'} `}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    { errors.password && (
                      <span className={`mb-3 d-flex flex-row justify-content-start ms-1 fw-bold ${isAuthor ? 'mt-1 p-1 text-bg-danger':'text-danger'}`}>
                          {errors.password}
                      </span>
                    ) }

                  <div className="form-check mb-3 d-flex flex-row justify-content-start">
                    <input onChange={iAmAuthor} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      <span className="ms-2 fw-bold">I am an author.</span>
                    </label>
                  </div>

                    <button className="btn btn-primary form-control mb-3">
                            Register
                    </button>

                    <div className="row">
                        <div className="text-center">
                          <button onClick={()=>{setLoginErrors({});setIsRegisterMode(false)}} className="btn regButton text-primary fw-bold">
                            Login
                          </button>
                        </div>
                    </div>
                  </form>

            </div>


    </div>
  );
};

export default Login;
