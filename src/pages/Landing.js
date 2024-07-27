import home_bg from '../assets/images/home_bg.jpg'
import codecollab_logo from '../assets/images/codecollab_logo.png'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const Landing = () => {

    const navigate = useNavigate();


    return (
        <div className="relative bg-cover bg-center h-screen" style={{backgroundImage: `url(${home_bg})`}}>
        <Link className='absolute top-4 left-4' to="/landing">
            <img src={codecollab_logo} alt="Logo" className="h-12" />
        </Link>
        <div className="flex flex-col items-center justify-center h-full bg-gray-800 bg-opacity-40">
            <h1 className="text-5xl font-bold text-white mb-4">Empowering Collaborative Development</h1>
            <p className="text-lg text-gray-200 mb-8">A Real-Time AI-Enhanced Code Editor for Software Creation</p>
            <div className="flex space-x-4">
               <Button 
                type="secondary" 
                onClick = {() => {
                    navigate('/login')
                }}
               >Connect</Button>
               <Button 
               type="primary"
               onClick={() => {
                navigate('/signup')
               }}
               >Get started</Button>
            </div>
        </div>
    </div>
    )
}

export default Landing;