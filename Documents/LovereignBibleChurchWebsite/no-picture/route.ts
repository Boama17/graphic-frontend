export async function GET() {

    const svg = `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1f2937"/>
      <circle cx="200" cy="150" r="80" fill="#374151"/>
      <circle cx="200" cy="120" r="40" fill="#4b5563"/>
      <path d="M120,350 Q200,250 280,350" stroke="#4b5563" stroke-width="60" fill="none"/>
    </svg>
  `

    return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
        },
    })
}
