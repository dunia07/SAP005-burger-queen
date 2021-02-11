// import React, { useState, useEffect } from 'react';
// import LogoLabBurger from './LogoLabBurger.png'
// import './App.css';

// const data = [
//   {
//     email: 'Isa',
//     password: 'Gosta de sorvete'
//   },
//   {
//     email: 'Cintia',
//     password: 'Gosta de goiaba cascão'
//   },
//   {
//     email: 'Moni',
//     password: 'Gosta de mousse'
//   },
// ];

// const User = ({email, password}) => {
//   return (
//    <div>
//      <p>{email}</p>
//      <p>{password}</p>  
//    </div>
//   );
// }

// const App = () => {
//   const [users, setUsers] = useState('');
//   const [email, setEmail] = useState(''); 
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     console.log('Component App Montado')
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     setUsers([ ...users, {email, password} ]);
//   }
  
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={LogoLabBurger} className="App-logo" alt="logo" />
//       </header>

      {/* {
        users.map((user, index) => (
          <User
            key={index}
            email={user.email}
            senha={user.password}
          />
        ))
      } */}

//       <form>
//         <input type='text' className='input' id='email' value={email} onChange={(event) => setEmail(event.target.value)}/>
//         <input type='password' className='input' id='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
//         <button type='submit' className='button' id='btn-login' onClick={(event) => handleSubmit(event)}>Login</button>
//         <p className='infoText'>Não possui uma conta?</p>
//         <p><span id='button' className='textRegister' onClick={(event) => handleSubmit(event)}>Cadastre-se</span></p>     
//       </form>
//     </div>
//   );
// }

// export default App;
