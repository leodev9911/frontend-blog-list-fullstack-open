import '../index.css'

export default function Notification({ success, error }) {
    return (
        <>
            <p id="notification" className={success ? 'success' : 'error'}>
                {success ? success : error}
            </p>
        </>
    )
}
