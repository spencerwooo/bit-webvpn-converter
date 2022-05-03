import Lottie from 'lottie-react'
import ShootingStarsJSON from '../assets/shooting-stars.json'

const ShootingStars = () => (
  <div className="mx-auto w-[100px] h-[100px] md:w-[180px] md:h-[180px]">
    <Lottie animationData={ShootingStarsJSON} loop autoplay />
  </div>
)

export default ShootingStars
