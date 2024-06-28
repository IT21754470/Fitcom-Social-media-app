import React, { useState } from 'react';
import img2 from '../assets/Contact4.jpg';
import img3 from '../assets/icon.jpg';
import axiosInstance from '../Api/AxiosConfig';

const Reg = () => {
  const [formData, setFormData] = useState({
    studentname: '',
    email: '',
    mobile: '',
    password:'',
    confirmPassword:''
  });
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear previous errors when input changes
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform client-side validation
    if (!formData.studentname || !formData.email || !formData.mobile || !formData.password || !formData.confirmPassword) {
      setErrors({ ...errors, 'all': 'All fields are required' });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, 'confirmPassword': 'Passwords do not match' });
      return;
    }
    if (!/(?=.*[A-Z])/.test(formData.password)) {
      setErrors({ ...errors, 'password': 'Password must contain at least one uppercase letter' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({ ...errors, 'email': 'Invalid email format' });
      return;
    }
    try {
      const response = await axiosInstance.post('/api/v1/socialmedia/save', formData);
      console.log(response.data); 
      setFormData({
        studentname: '',
        email: '',
        mobile: '',
        password:'',
        confirmPassword:''
      });
      setRegistrationStatus('Successfully registered!');
  
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='bg-white menu-background'>
      <div className='section-container'>
        <div className='grid grid-cols-2 divide-x'>
          <div >
            <img className=' h-[720px] object-cover' src={img2} alt="Contact Us" />
          </div>
          <div className='flex items-center justify-center flex-col-reverse mb-6'>
            <div className='shadow-2xl bg-slate-200 p-40 rounded-2xl h-[720px] flex flex-col items-center justify-center mb-6'>
              <img className=' h-[70px] flex items-center mb-6' src={img3} alt="Contact Us" />
              <h2 className='text-4xl text-center font-semibold text-slate-700 mb-5'>Register Now!</h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <input
                    type='text'
                    name='studentname'
                    value={formData.studentname}
                    onChange={handleChange}
                    placeholder=' Name'
                    className={`w-full px-4 py-2 border shadow-xl bg-simpleLightYellow text-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.studentname ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.studentname && <p className="text-red-500">{errors.studentname}</p>}
                </div>
                <div className='space-y-2'>
                  <input
                    type='Email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='email'
                    className={`w-full px-4 py-2 border shadow-xl bg-simpleLightYellow rounded-md text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 ${errors.email ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div className='space-y-2'>
                  <input
                    type='number'
                    name='mobile'
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder=' mobile '
                    className={`w-full px-4 py-2 border shadow-xl bg-simpleLightYellow rounded-md text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 ${errors.mobile ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
                </div>
                <div className='space-y-2'>
                  <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder=' Password '
                    className={`w-full px-4 py-2 border shadow-xl bg-simpleLightYellow rounded-md text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 ${errors.password ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>
                <div className='space-y-2'>
                  <input
                    type='password'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder=' Confirm Password '
                    className={`w-full px-4 py-2 border shadow-xl bg-simpleLightYellow rounded-md text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                </div>
                {errors.all && <p className="text-red-500">{errors.all}</p>}
                <div className='text-center'>
                  <button
                    type='submit'
                    className='shadow-xl bg-yellow-300 text-base rounded-xl text-slate-700 px-8 py-3 hover:bg-yellow-400 transition duration-300'
                  >
                    Register
                  </button>
                  <button onClick={()=>window.location.href='/login'}
                    type='submit'
                    className=' text-base rounded-xl text-slate-700 px-8 py-3  transition duration-300'
                  >
                    Click here to Login
                  </button>
                </div>
              </form>
              {registrationStatus && <p>{registrationStatus}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reg;
