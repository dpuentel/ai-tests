export const getRandHexColor = () => {
  return `# ${Math.floor(Math.random() * 0xFF_FF_FF).toString(16).padStart(6, '0')}`
}
