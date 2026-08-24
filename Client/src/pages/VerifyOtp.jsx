import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const VerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-brand-50/70 to-white px-4">

      <motion.div
        className="p-10 bg-white rounded-2xl shadow-card border border-ink-100 w-full max-w-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="font-display text-3xl font-semibold text-center text-ink-900 mb-2">Verify your OTP</h2>
        <p className="text-center text-ink-500 mb-8">
          We've sent a verification code to your email. Please enter it below.
        </p>

        <form>
          <motion.div
            className="flex justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {otp.map((data, index) => (
              <Input
                key={index}
                className="w-14 h-14 text-center text-2xl font-semibold"
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
            <Button size="lg" className="w-full">
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
          <p className="text-sm text-ink-500">
            Didn't receive the code?{' '}
            <button className="text-brand-600 font-medium hover:underline">
              Resend
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default VerifyOtp
