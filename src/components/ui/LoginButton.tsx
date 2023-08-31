import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Form from '@radix-ui/react-form';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  return <button className="text-indigo-900 text-opacity-80" onClick={() => loginWithRedirect()}>Log In</button>;
}

export default Login;

// const Login: React.FC = () => {

//   const navigate = useNavigate();


//   // const handleSignupSubmit = () => {
//   //   navigate('/signup');
//   // };


//   return (
//     <div>

// <div className="flex w-screen flex-col items-center justify-center md:flex-row md:justify-between px-8 py-4">
//       <div className="flex flex-col items-center md:flex-row">
//         <div className="flex justify-center md:mx-0 md:mr-4 md:items-center md:justify-start">
//          <Link className = "text-indigo-800" to="/">Home</Link>
//         </div>
//       </div>
//     </div>      

//       <div className="login-page">
//         <h1 className="text-gray-200 mb-10">Login</h1>

//         <div className="login-container">
//           <Form.Root className="FormRoot">
//             <Form.Field className="FormField" name="email">
//               <div style={{ display: 'flex', alignItems: 'baseline', flexDirection: 'column', justifyContent: 'space-between' }}>
//                 <Form.Label className="text-gray-100 mb-3">Email</Form.Label>
//                 <Form.Message className="text-red-400 italic text-sm mb-1" match="valueMissing">
//                   Please enter your email
//                 </Form.Message>
//                 <Form.Message className="text-red-400 italic text-sm mb-1" match="typeMismatch">
//                   Please provide a valid email
//                 </Form.Message>
//               </div>
//               <Form.Control asChild>
//                 <input className="rounded-md mb-5" type="email" required />
//               </Form.Control>
//             </Form.Field>
//             <Form.Field className="FormField" name="question">
//               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline', justifyContent: 'space-between' }}>
//                 <Form.Label className="text-gray-100 mb-3">Password</Form.Label>
//                 <Form.Message className="text-red-400 italic text-sm mb-1" match="valueMissing">
//                   Please enter a password
//                 </Form.Message>
//               </div>
//               <Form.Control asChild>
//                 <input className="rounded-md mb-5" type="password" required />
//               </Form.Control>
//             </Form.Field>
//             <Form.Submit asChild>
//               <button className="border-solid border-1 border-indigo-400 text-indigo-900" style={{ marginTop: 10 }}>
//                 Sign In
//               </button>
//             </Form.Submit>
//           </Form.Root>
//         </div>

//       </div>
//     </div>
//   )
// }

