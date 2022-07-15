import {useTypedSelector} from "../hooks/redux";

export const FavouritesPage = () => {
    const {favourites} = useTypedSelector(state => state.github)

    if (favourites.length === 0) return <p className="text-center">No items.</p>

    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
            <ul className="list-none">
                { favourites.map(link => (
                    <li key={link}>
                        <a href={link} target="_blank">{link}</a>
                    </li>
                )) }
            </ul>
        </div>
    )
}