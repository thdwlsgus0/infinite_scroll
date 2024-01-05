import "./App.css";
import { useInfiniteQuery } from "react-query";

function App() {
  const LIMIT = 10;

  const fetchRepositories = async (page) => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=topic:react&per_page=${LIMIT}&page=${page}`
    );

    return response.json();
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      "repos",
      ({ pageParam = 1 }) => fetchRepositories(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          return nextPage;
        },
      }
    );

  return (
    <div className="App">
      {isSuccess &&
        data.pages.map((page) =>
          page.items.map((comment) => (
            <div className="result" key={comment.id}>
              <span>{comment.name}</span>
              <p>{comment.description}</p>
            </div>
          ))
        )}
    </div>
  );
}

export default App;
