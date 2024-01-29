import './Overlay.css'
const  Overlay = ({isLoading,outlaymessage}) =>{
   return (
    isLoading && (
        <div className="loading-overlay">
            <div className="spinner"></div>
            <p>{outlaymessage}...</p>
        </div>
    )
   )
}

export default Overlay