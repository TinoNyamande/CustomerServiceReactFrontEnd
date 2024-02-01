export default function Nodata (props) {
    return (
        <div className="nodata-container">
            <h4>{props.title}</h4>
            <p>{props.message}</p>
        </div>
    )
}