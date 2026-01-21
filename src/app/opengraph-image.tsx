import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

// Image metadata
export const alt = 'Zulu - Connected Healthcare Platform'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: '#0D0106',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="475"
          height="180"
          viewBox="0 0 95 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="17.8" cy="18.2" r="16" stroke="#FBF9FF" strokeWidth="3.6" />
          <path
            d="M9.6499 32.15C21.9499 32.15 21.7999 18.3802 33.4999 18.3802"
            stroke="#FBF9FF"
            strokeWidth="3.6"
          />
          <circle cx="11.4999" cy="17.3" r="3.6" fill="#FBF9FF" />
          <path
            d="M56.2705 26.0416V28H44.376V26.0992L53.2464 14.8096H45.0096V12.8512H56.1265V14.8384L47.3136 26.0416H56.2705ZM70.4664 12.736V28H67.9896V25.408L67.0392 27.1936C65.7432 28.144 64.62 28.4032 63.0648 28.4032C59.8968 28.4032 58.0536 26.6176 57.708 24.5152C57.5928 23.7376 57.564 23.1328 57.564 21.8944V12.736H60.0408V21.4336C60.0408 21.9232 60.0696 22.7584 60.156 23.536C60.3864 25.264 61.6248 26.4448 63.6984 26.4448C66.0888 26.4448 67.9896 24.6592 67.9896 19.4464V12.736H70.4664ZM75.7597 6.832V23.6224C75.7597 24.0832 75.7597 24.5728 75.7885 25.0624C75.8461 26.0416 76.3069 26.3584 77.6605 26.2144V28C77.1133 28.0864 76.4797 28.1152 75.9037 28.1152C74.4637 28.1152 73.3981 27.6544 73.3117 25.7248C73.2829 25.2064 73.2829 24.544 73.2829 23.7088V6.832H75.7597ZM91.7458 12.736V28H89.269V25.408L88.3186 27.1936C87.0226 28.144 85.8994 28.4032 84.3442 28.4032C81.1762 28.4032 79.333 26.6176 78.9874 24.5152C78.8722 23.7376 78.8434 23.1328 78.8434 21.8944V12.736H81.3202V21.4336C81.3202 21.9232 81.349 22.7584 81.4354 23.536C81.6658 25.264 82.9042 26.4448 84.9778 26.4448C87.3682 26.4448 89.269 24.6592 89.269 19.4464V12.736H91.7458Z"
            fill="#FBF9FF"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
