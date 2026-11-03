import LinksyLogo from "../Assets/Linksy_logo.png";
import Image from 'next/image';
import LoginForm from '../Components/loginForm';


export default function Login() {
  return (
    <div className='flex flex-col items-center h-screen justify-center space-y-4'>
      {/* Top Part */}
      <div className='flex flex-col items-center space-y-2'>
        <Image src={LinksyLogo} width={150} height={100} alt='Linksy logo'></Image>
        <h3 className='font-bold text-center text-3xl'>Welcome Back</h3>
        <p className='text-gray-500 text-center text-md'>Log in to pick up your conversations where you left them.</p>
      </div>
      <div>
        <LoginForm />
      </div>
    </div>
  )
}
