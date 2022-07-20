import React from "react";

import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api";

import {useDebounce} from "../hooks/debounce";
import {RepoCard} from "../components/RepoCard";

export const HomePage = () => {
    const [search, setSearch] = React.useState('')
    const [dropdown, setDropdown] = React.useState(true);

    const debouncedValue = useDebounce(search)

    const {isError, isLoading, data} = useSearchUsersQuery(debouncedValue, {
        skip: debouncedValue.length < 3,
        refetchOnFocus: true
    })
    const [fetchRepos, {isLoading: reposLoading, isError: reposError, data: reposData}] = useLazyGetUserReposQuery()

    React.useEffect(() => {
        setDropdown(data && debouncedValue.length > 3 && data!.length > 0 ? true : false)
    }, [debouncedValue, data])

    const onClickHandler = (userLogin: string) => {
        setDropdown(false)
        fetchRepos(userLogin)
    }

    return (
        <div className="flex justify-center pt-10 mx-auto h-screen">
            {isError && <h2 className="text-center text-red-600">Something went wrong...</h2>}

            <div className="relative w-[560px]">
                <input
                    type="text"
                    className="border py-2 px-4 w-full h-[42px] mb-2"
                    placeholder="Search for Github user name"
                    onChange={event => setSearch(event.target.value)}
                    value={search}
                />

                {dropdown &&
                    <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
                        {isLoading && <p className="text-center">Loading...</p>}
                        {data?.map(user => (
                            <li key={user.id}
                                className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
                                onClick={() => onClickHandler(user.login)}
                            >
                                {user.login}
                            </li>
                        ))}
                    </ul>
                }

                <div className="container">
                    {reposLoading && <p className="text-center">Loading repo...</p>}
                    {reposData?.map(repo => (
                        <RepoCard repo={repo} key={repo.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}