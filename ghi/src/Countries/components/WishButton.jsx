import { Link } from 'react-router-dom'

export default function WishButton() {
    return (
        <div>
            <Link to="/wishes">
                <button>Wish</button>
            </Link>
        </div>
    )
}
