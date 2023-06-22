import React, { useEffect } from 'react';
import { useState } from 'react';
import LogoMandehLogin from '../image/logo-mandeh-login.png';
import LogoMandeh from '../image/logo-hori.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaAngleDoubleRight } from 'react-icons/fa';
import axios from 'axios';
import { setToken } from '../features/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = JSON.stringify({
      email,
      password,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/auth/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const { message, token } = response.data;
        alert(message);
        // Lakukan navigasi ke halaman berikutnya dengan token jika login berhasil
        dispatch(setToken(token));
        navigate('/home', { token });
      })
      .catch((error) => {
        console.log(error);
        alert('Login failed');
      });
  };

  return (
    <div>
      {/* image logo */}
      <div className="absolute opacity-25">
        <img src={LogoMandehLogin} className="h-screen" />
      </div>
      {/* image logo */}
      {/* image logo lengkap */}
      <div className="relative">
        <img src={LogoMandeh} className="w-[250px] absolute right-0 m-5" />
      </div>
      {/* image logo lengkap */}
      {/* card */}
      <div className="flex flex-col h-screen justify-center">
        <div className="m-auto bg-bgSec w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-[54px] font-semibold text-textPri text-center">
              Login
            </h5>
            <p className="text-sm text-gray-500  text-center font-medium">
              Silahkan masukan email dan password
            </p>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-1 focus:outline-none focus:ring-bgOpt2 focus:border-bgOpt2 block w-full p-2.5 "
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-1 focus:outline-none focus:ring-bgOpt2 focus:border-bgOpt2 block w-full p-2.5 "
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-bgOpt hover:bg-bgOpt2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Masuk
            </button>
            <div className="text-sm font-medium text-gray-500 text-center ">
              Belum mempunyai akun? daftar{' '}
              <a href={'/register'} className="text-bgOpt2 hover:underline ">
                disini
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* card */}
      {/* tombol back */}
      <div className="flex items-center float-right mr-10 -mt-8 text-bgFunc hover:text-bgFunc2 font-medium ">
        <div>
          <Link to={'/'} className="">
            Kembali{' '}
          </Link>
        </div>
        <div>
          <Link to={'/'}>
            <FaAngleDoubleRight className="" />{' '}
          </Link>
        </div>
      </div>
      {/* tombol back */}
    </div>
  );
};

export default Login;
