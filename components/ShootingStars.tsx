import Lottie from 'lottie-react'
import ShootingStarsJSON from '../assets/shooting-stars.json'
import ShootingStarsReverseJSON from '../assets/shooting-stars-reverse.json'

const ShootingStars = ({ reverse = false }: { reverse?: boolean }) => (
  <div className="mx-auto w-[100px] h-[100px] md:w-[180px] md:h-[180px]">
    <Lottie animationData={reverse ? ShootingStarsReverseJSON : ShootingStarsJSON} loop autoplay />
  </div>
)

export default ShootingStars
