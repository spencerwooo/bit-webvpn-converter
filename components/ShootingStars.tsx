import Lottie from 'lottie-react'
import ShootingStarsJSON from '../assets/shooting-stars.json'

const ShootingStars = () => (
  <Lottie animationData={ShootingStarsJSON} style={{ width: 180, height: 180 }} loop autoplay />
)

export default ShootingStars
