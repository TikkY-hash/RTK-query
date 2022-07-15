import React from 'react'
import {RepoType} from "../models/models";
import {useAction} from "../hooks/actions";
import {useTypedSelector} from "../hooks/redux";

export function RepoCard({repo}: { repo: RepoType }) {
    const {favourites} = useTypedSelector(state => state.github)

    const {addFavourite, removeFavourite} = useAction();

    const [isFavourite, setIsFavourite] = React.useState(favourites.includes(repo.html_url))

    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        addFavourite(repo.html_url);

        setIsFavourite(true)
    }

    const deleteFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        removeFavourite(repo.html_url);

        setIsFavourite(false);
    }

    return (
        <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
            <a href={repo.html_url} target="_blank">
                <h2 className="text-lg font-bold">{repo.full_name}</h2>
                <p className="text-sm">
                    Forks: <span className="font-bold mr-2">{repo.forks}</span>
                    Watchers: <span className="font-bold">{repo.watchers}</span>
                </p>
                <p className="text-sm font-thin">{repo?.description}</p>
            </a>

            {!isFavourite && (
                <button
                    className="py-2 px-4 bg-yellow-400 mr-2 rounded hover:shadow-md transition-all"
                    onClick={addToFavourite}
                >Add
                </button>
            )}

            {isFavourite && (
                <button
                    className="py-2 px-4 bg-red-400 mr-2 rounded hover:shadow-md transition-all"
                    onClick={deleteFromFavourite}
                >Delete
                </button>
            )}
        </div>
    )
}