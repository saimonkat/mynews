import { Profile } from '@/components/profile'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile',
}

export default function ProfilePage() {
  return (
    <>
      <Profile />
    </>
  )
}
