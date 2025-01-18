import { useState } from "react"

function App() {

  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState("")
  const [size, setSize] = useState(150)


  async function generateQR() {
    setLoading(true)
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`
      setImg(url);
    } catch (error) {
      console.log("Error while generating QR " + error);
    } finally {
      setLoading(false)
    }
  }

  async function downloadQR() {
    fetch(img)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob)
      link.download = "qrcode.png"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="container">
      <h1>QR CODE GENERATOR</h1>
      {loading && (<p>Generating QR</p>)}
      {img && <img src={img} className="qr-imaage"/>}
      <div>
        <label htmlFor="data" className="label">Data for QR code</label>
        <input type="text" className="input" name="data" id="data" placeholder="Enter data for QR code" onChange={(e) => setData(e.target.value)} value={data}/>
        <label htmlFor="size" className="label">Image size</label>
        <input type="text" name="size" className="input" id="size" placeholder="Enter image size" onChange={(e) => setSize(e.target.value)} value={size}/>
        <button className="generate-button" onClick={generateQR}>Generate image</button>
        <button className="download-button" onClick={downloadQR}>Download image</button>
      </div>
    </div>
  )
}

export default App
