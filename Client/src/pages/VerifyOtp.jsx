import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const VerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    
      <motion.div
        className="p-10 bg-white rounded-lg shadow-lg w-full max-w-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Verify Your OTP</h2>
        <p className="text-center text-gray-600 mb-8">
          We've sent a verification code to your email. Please enter it below.
        </p>

        <form>
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {otp.map((data, index) => (
              <Input
                key={index}
                className="w-16 h-16 text-center text-2xl font-semibold border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                type="text"
                name="otp"
                id={`otp-${index}`}
                maxLength={1}
                value={data}
                onChange={(e) => {
                  const newOtp = [...otp]
                  newOtp[index] = e.target.value
                  setOtp(newOtp)
                }}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button className="w-full bg-orange-500 hover:bg-orange-600 transition-colors duration-300 text-white py-3 rounded-md">
              Verify
            </Button>
          </motion.div>
        </form>

        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className="text-sm text-gray-600">
            Didn't receive the code?{' '}
            <button className="text-blue-500 hover:underline">
              Resend
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default VerifyOtp
