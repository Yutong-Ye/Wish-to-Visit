import { Link } from 'react-router-dom'

export default function VisitButton() {
    return (
        <div>
            <Link to="/visit">
                <button>Visit</button>
            </Link>
        </div>
    )
}
